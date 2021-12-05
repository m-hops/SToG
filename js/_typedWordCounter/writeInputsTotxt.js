$(function() {
    $('#countWordsBtn').on('click', function(e) {

        var str = $('#wordsTxtAra').val();
        var wordFreq = wordFrequency(str);
        var wordCount = countWords(str);
        var uniqueWords = wordFreq.length;
        var summaryData = [
            [ 'TOTAL', wordCount ],
            [ 'UNIQUE', uniqueWords ]
        ];
        var table = toTable(wordFreq, ['Word', 'Frequency']);
        addRowsBefore(table, summaryData);
        $('#countDisplay').html(table);

    });

});

$(function() {
  $('#insertCaption').on('submit', function(e) {

    event.preventDefault();
    console.log('submitted');
    var newCap = $('#insertCaption').serialize();
    $.ajax({
         type: 'GET',
          url: "index.php",
          data: newCap,
          dataType: "text", /*response will be text */
          cache: false,
          timeout: 600000,
          success: function (response) {
               console.log(newCap);
         },
         error:function(){
           console.log("error occurred");
         }
    });

  });

});

$(function() {
  $('#readTxt').on('click', function(e) {

    readText();

      $.ajax({
           type: "GET",
            url: "inputs.txt",
            data: "data",
            dataType: "text", /*response will be text */
            cache: false,
            timeout: 600000,
            success: function (response) {
              //reponse is a STRING (not a JavaScript object -> so we need to convert)
                 console.log("we had success!");
                 console.log(response);
           },
           error:function(){
             console.log("error occurred");
           }
      });

  });

});
