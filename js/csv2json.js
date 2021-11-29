"use strict";

let cvsData;
let inputFile = 'assets/rooms.csv';

class SToGRoomCSVImporter{
  constructor(fileIn){
    this.rooms = [];
    this.currentRoom = null;
    this.currentSubject = null;
    this.currentVerb = null;
    this.lines = null;
    this.rows = [];
    loadStrings(inputFile, this.onCSVFileLoaded.bind(this), this.onCSVFileError.bind(this));
  }

  logInfo(str){
    //console.log(str);
  }

  logError(str, rowIndex){
    console.log("ERROR:["+ (rowIndex+1) + "] " + str);
  }

  onCSVFileLoaded(lines) {
    this.lines = lines;
    this.rows = [];
    console.log("Converting file...");
    for(let i = 0; i != this.lines.length; ++i){
      this.rows.push(this.csvToArray(this.lines[i]));
    }
    let curRow = 0;
    while(curRow < this.rows.length){
      curRow = this.processRow(curRow);
    }
    let text = JSON.stringify(this.rooms);
    this.download(text, "rooms.json", )
  }

  onCSVFileError() {
    this.logError('Failed to load csv file');
  }

  download(strData, strFileName, strMimeType = 'text/plain') {
      var D = document,
          A = arguments,
          a = D.createElement("a"),
          d = A[0],
          n = A[1],
          t = A[2] || "text/plain";

      //build download link:
      a.href = "data:" + strMimeType + "charset=utf-8," + escape(strData);


      if (window.MSBlobBuilder) { // IE10
          var bb = new MSBlobBuilder();
          bb.append(strData);
          return navigator.msSaveBlob(bb, strFileName);
      } /* end if(window.MSBlobBuilder) */



      if ('download' in a) { //FF20, CH19
          a.setAttribute("download", n);
          a.innerHTML = "downloading...";
          D.body.appendChild(a);
          setTimeout(function() {
              var e = D.createEvent("MouseEvents");
              e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
              a.dispatchEvent(e);
              D.body.removeChild(a);
          }, 66);
          return true;
      }; /* end if('download' in a) */



      //do iframe dataURL download: (older W3)
      var f = D.createElement("iframe");
      D.body.appendChild(f);
      f.src = "data:" + (A[2] ? A[2] : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : escape)(strData);
      setTimeout(function() {
          D.body.removeChild(f);
      }, 333);
      return true;
  }

  pushSubstr(output, head, str, start, length){
    let value = head;
    if(length>0){
      value += str.substr(start, length);
    }
    output.push(head + str.substr(start, length));
    return start + length;
  }

  //return past the last quote
  parseString(output, str, c){
    // c is on a "
    let parsedString = "";
    ++c;
    let dataStart = c;
    if(c >= str.length) return this.pushSubstr(output, parsedString, str, dataStart, c - dataStart);
    let escaped = false;
    while(c < str.length){
      if(str[c] == '"'){
        if(escaped){
          if(c - dataStart > 0){
            parsedString += str.substr(dataStart, c - dataStart);
          }
          escaped = false;
          dataStart = c+1;
        } else {
          escaped = true;
        }
      } else if(escaped){
        break;
      }
      ++c;
    }
    if(escaped){
      //end of string
      this.pushSubstr(output, parsedString, str, dataStart, c - dataStart);
    }
    return c+1;
  }

  // return index of next ',' or the end of string
  parseValue(output, str, c){
    if(c >= str.length){
      output.push("");
    }
    let valueStart = c;
    if(str[c] == '"') return this.parseString(output, str, c)+1;
    while(c < str.length && str[c] != ','){
      ++c;
    }
    return this.pushSubstr(output, "", str, valueStart, c - valueStart) + 1;
  }

  csvToArray(strCSV){
    let output = [];
    let c = 0;
    let currentDataHead = "";
    let dataStart = 0;
    while(c <= strCSV.length){
      c = this.parseValue(output, strCSV, c);
    }
    return output;
  }

  processRow(rowIndex){
    if(this.rows[rowIndex].length > 0 && this.rows[rowIndex][0] != "") return this.processRowRoom(this.rows[rowIndex], rowIndex);
    if(this.rows[rowIndex].length > 1 && this.rows[rowIndex][1] != "") return this.processRowSubject(this.rows[rowIndex], rowIndex);
    if(this.rows[rowIndex].length > 2 && this.rows[rowIndex][2] != "") return this.processRowVerb(this.rows[rowIndex], rowIndex);
    if(this.rows[rowIndex].length > 3) return this.processRowReaction(this.rows[rowIndex], rowIndex, 3);
    this.logInfo("Row " + (rowIndex+1) + " ignored: " + this.lines[rowIndex]);
    return rowIndex+1;
  }

  processRowRoom(values, rowIndex){
    let room = new Room(values[0], values[1], values[2]);
    this.logInfo("Creating new room name:" + room.name + " img:" + room.img + " txt:" + room.txt);
    this.rooms.push(room);
    this.currentRoom = room;
    this.currentSubject = null;
    this.currentVerb = null;
    return rowIndex+1;
  }

  processRowSubject(values, rowIndex){
    let subject = new Subject(values[1]);
    this.logInfo("Creating new subject name:" + subject.name);
    if(this.currentRoom != null) {
      this.currentRoom.subjects.push(subject);
      this.currentSubject = subject;
      this.currentVerb = null;
    } else
      this.logError("No room declared while parsing subject.", rowIndex);
    return rowIndex+1;
  }

  processRowVerb(values, rowIndex){
    let verb = new Verb(values[2]);
    this.logInfo("Creating new verb name:" + verb.name);
    if(this.currentSubject != null) {
      this.currentSubject.verbs.push(verb);
      this.currentVerb = verb;
    } else
      this.logError("No subject declared while parsing verb.", rowIndex);
    return rowIndex+1;
  }

  processRowReaction(values, rowIndex, col=3){
    let r = this.processReaction(values, rowIndex, col);
    if(this.currentVerb != null) {
      this.currentVerb.reactions.push(r.reaction);
    } else
      this.logError("No verb declared while parsing reaction.", rowIndex);
    return r.rowIndex;
  }

  valueOrNull(array, index){
    if(index < array.length) return array[index];
    return null;
  }

  processReactionIf(values, rowIndex, col){
    let reaction = new ReactionIf(this.valueOrNull(values,col+1), this.valueOrNull(values,col+2), this.valueOrNull(values,col+3));
    this.logInfo("Creating ReactionIf(" + reaction.lhs + ", " + reaction.op + ", " + reaction.rhs + ")");
    let scopeEnd = false;
    let scopeReactions = reaction.then;
    let scopeIf = reaction;
    ++rowIndex;
    while(rowIndex < this.rows.length && !scopeEnd){
      // if row has anything in col 0,1 or 2, not reaction rows, exit out.
      if(this.rows[rowIndex][0] != "" || this.rows[rowIndex][1] != "" || this.rows[rowIndex][2] != "")
        break;
      let scopeCmd = this.rows[rowIndex][col];
      switch(scopeCmd){
        case "":
          let r = this.processReaction(this.rows[rowIndex], rowIndex, col+1);
          rowIndex = r.rowIndex;
          if(r.reaction != null){
            scopeReactions.push(r.reaction);
          }
          break;
        case "else":
          scopeReactions = scopeIf.else;
          ++rowIndex;
          break;
        case "else if":
        case "elseif":
          let subIf = new ReactionIf(this.rows[rowIndex][col+1], this.rows[rowIndex][col+2], this.rows[rowIndex][col+3]);
          this.logInfo("Creating elseif ReactionIf(" + subIf.lhs + ", " + subIf.op + ", " + subIf.rhs + ")");
          scopeIf.else.push(subIf);
          scopeIf = subIf;
          scopeReactions = scopeIf.then;
          ++rowIndex;
          break;
        case "end if":
        case "endif":
          scopeEnd = true;
          ++rowIndex;
          break;
        default:
          this.logError("Unkown command while parsing if", rowIndex);
          ++rowIndex;
          break;
      }
    }
    return {reaction, rowIndex};
  }

  processReaction(values, rowIndex, col=3){
    while(col < values.length && values[col] == "") ++col;
    if(col >= values.length) return [null, rowIndex+1];
    let reaction = null;
    switch(values[col]){
      case "txt":
        reaction = new ReactionTxt(this.valueOrNull(values,col+1));
        this.logInfo("Creating ReactionTxt(\"" + reaction.txt + "\")");
        ++rowIndex;
        break;
      case "img":
        reaction = new ReactionImg(this.valueOrNull(values,col+1));
        this.logInfo("Creating ReactionImg(\"" + reaction.img + "\")");
        ++rowIndex;
        break;
      case "sfx":
        reaction = new ReactionSFX(this.valueOrNull(values,col+1));
        this.logInfo("Creating ReactionSFX(\"" + reaction.sfx + "\")");
        ++rowIndex;
        break;
      case "musicvolume":
        reaction = new ReactionMusicVolume(this.valueOrNull(values,col+1));
        this.logInfo("Creating ReactionMusicVolume(\"" + reaction.level + "\")");
        ++rowIndex;
        break;
      case "startmusic":
        reaction = new ReactionStartMusic(this.valueOrNull(values,col+1));
        this.logInfo("Creating ReactionStartMusic(\"" + reaction.name + "\")");
        ++rowIndex;
        break;
      case "stopmusic":
        reaction = new ReactionStopMusic();
        this.logInfo("Creating ReactionStopMusic()");
        ++rowIndex;
        break;
      case "set":
        reaction = new ReactionSet(this.valueOrNull(values,col+1), this.valueOrNull(values,col+2));
        this.logInfo("Creating ReactionSet(\"" + reaction.var + "\", \"" + reaction.value + "\")");
        ++rowIndex;
        break;
      case "goto":
        reaction = new ReactionGoto(this.valueOrNull(values,col+1));
        this.logInfo("Creating ReactionGoto(\"" + reaction.room + "\")");
        ++rowIndex;
        break;
      case "if":
        let r = this.processReactionIf(values, rowIndex, col);
        reaction = r.reaction;
        rowIndex = r.rowIndex;
        break;
      default:
        this.logError("[Error] Unknown command '"+values[col]+"'", rowIndex);
        ++rowIndex;
        break;
    }
    return {reaction, rowIndex};
  }
}


function translateFile(){
  let importer = new SToGRoomCSVImporter(inputFile);
  //loadStrings(inputFile, onCSVFileLoaded, onCSVFileError);
}

function preload() {

}

function mouseClicked() {
}

function mousePressed() {

}

function mouseReleased() {

}

function keyPressed() {

}

function keyTyped() {
    translateFile();
}

function setup() {
  createCanvas(800,600);
}

function draw() {
  background(0);
  fill(255, 255, 255);
  text("press any key to convert file " + inputFile, 100,100);
}
