function toDevanagari(_word) {
    "use strict"; /*Strict mode changes previously accepted "bad syntax" into real errors.*/

    //get input
    var inp = _word;
    //convert to lower case;
    inp = inp.toLowerCase();
    //convert to Unicode Hex
    inp = "\\u0020" + toUni(inp);  //add space

    var rVow = ['\\u0061', '\\u0101', '\\u0069', '\\u012b', '\\u0075', '\\u016b', '\\u1e5b', '\\u1e5d', '\\u0065', '\\u0061\\u0069', '\\u006f', '\\u0061\\u0075', '\\u1e37', '\\u1e39', '\\u1e43', '\\u1e25'];

    //-------------- Start Conversion ---------------//

    //Words starting with vowels
    //dipthongs
    inp = inp.replace(/\\u0020\\u0065/g, "\\u0020\\u090f");             //if 'e' preceeded by space
    inp = inp.replace(/\\u000a\\u0065/g, "\\u000a\\u090f");             //if 'e' preceeded by new line
    inp = inp.replace(/\\u0020\\u0061\\u0069/g, "\\u0020\\u0910");       //if 'ai' preceeded by space
    inp = inp.replace(/\\u000a\\u0061\\u0069/g, "\\u000a\\u0910");       //if 'ai' preceeded by new line
    inp = inp.replace(/\\u0020\\u006f/g, "\\u0020\\u0913");        //if 'o' preceeded by space
    inp = inp.replace(/\\u000a\\u006f/g, "\\u000a\\u0913");        //if '' preceeded by new line
    inp = inp.replace(/\\u0020\\u0061\\u0075/g, "\\u0020\\u0914");       //if 'au' preceeded by space
    inp = inp.replace(/\\u000a\\u0061\\u0075/g, "\\u000a\\u0914");       //if 'au' preceeded by space
    
	
    //Words starting with vowels
    //Simple vowels
    inp = inp.replace(/\\u0020\\u0061/g, "\\u0020\\u0905");       //if 'a' preceeded by space
    inp = inp.replace(/\\u000a\\u0061/g, "\\u000a\\u0905");
    inp = inp.replace(/\\u0020\\u0101/g, "\\u0020\\u0906");       //if 'aa' preceeded by space
    inp = inp.replace(/\\u000a\\u0101/g, "\\u000a\\u0906");
    inp = inp.replace(/\\u0020\\u0069/g, "\\u0020\\u0907");       //if 'i' preceeded by space
    inp = inp.replace(/\\u000a\\u0069/g, "\\u000a\\u0907");
    inp = inp.replace(/\\u0020\\u012b/g, "\\u0020\\u0908");       //if 'Ä«' preceeded by space
    inp = inp.replace(/\\u000a\\u012b/g, "\\u000a\\u0908");
    inp = inp.replace(/\\u0020\\u0075/g, "\\u0020\\u0909");       //if 'u' preceeded by space
    inp = inp.replace(/\\u000a\\u0075/g, "\\u000a\\u0909");
    inp = inp.replace(/\\u0020\\u016b/g, "\\u0020\\u090a");       //if 'Å«' preceeded by space
    inp = inp.replace(/\\u000a\\u016b/g, "\\u000a\\u090a");
    inp = inp.replace(/\\u0020\\u1e5b/g, "\\u0020\\u090b");       //if 'á¹›' preceeded by space
    inp = inp.replace(/\\u000a\\u1e5b/g, "\\u000a\\u090b");
    inp = inp.replace(/\\u0020\\u1e5d/g, "\\u0020\\u0960");       //if 'á¹' preceeded by space
    inp = inp.replace(/\\u000a\\u1e5d/g, "\\u000a\\u0960");
    inp = inp.replace(/\\u0020\\u1e37/g, "\\u0020\\u090c");       //if 'á¸·' preceeded by space
    inp = inp.replace(/\\u000a\\u1e37/g, "\\u000a\\u090c");
    inp = inp.replace(/\\u0020\\u1e39/g, "\\u0020\\u0961");       //if 'á¸¹' preceeded by space
    inp = inp.replace(/\\u000a\\u1e39/g, "\\u000a\\u0961");



    // function to replace symbol with replacement if following letter in class
    function followed(param, symbol, replacement) {
        var i;
        
        for (i = 0; i < rVow.length; i++) {

            param = param.split(symbol + rVow[i]).join(replacement + rVow[i]);
        }

        return param;
    }
    
    //Non-final consonants
    //If subsequent letter in rVow then replace
    
    inp = followed(inp, "\\u006b\\u0068", "\\u0916"); //kh
    inp = followed(inp, "\\u006b", "\\u0915");        //k
    inp = followed(inp, "\\u0067\\u0068", "\\u0918"); //gh
    inp = followed(inp, "\\u0067", "\\u0917");        //g
    inp = followed(inp, "\\u1e45", "\\u0919"); //gutteral nasal
    
    inp = followed(inp, "\\u0063\\u0068", "\\u091b"); //ch
    inp = followed(inp, "\\u0063", "\\u091a"); //c
    inp = followed(inp, "\\u006a\\u0068", "\\u091d"); //jh
    inp = followed(inp, "\\u006a", "\\u091c"); //j
    inp = followed(inp, "\\u00f1", "\\u091e"); //Ã±
    
    inp = followed(inp, "\\u1e6d\\u0068", "\\u0920"); //á¹­h
    inp = followed(inp, "\\u1e6d", "\\u091f"); //á¹­
    inp = followed(inp, "\\u1e0d\\u0068", "\\u0922"); //á¸h
    inp = followed(inp, "\\u1e0d", "\\u0921"); //á¸
    inp = followed(inp, "\\u1e47", "\\u0923"); //á¹‡
    
    inp = followed(inp, "\\u0074\\u0068", "\\u0925"); //th
    inp = followed(inp, "\\u0074", "\\u0924"); //t
    inp = followed(inp, "\\u0064\\u0068", "\\u0927"); //dh
    inp = followed(inp, "\\u0064", "\\u0926"); //d
    inp = followed(inp, "\\u006e", "\\u0928"); //n
    
    inp = followed(inp, "\\u0070\\u0068", "\\u092b"); //ph
    inp = followed(inp, "\\u0070", "\\u092a"); //p
    inp = followed(inp, "\\u0062\\u0068", "\\u092d"); //bh
    inp = followed(inp, "\\u0062", "\\u092c"); //b
    inp = followed(inp, "\\u006d", "\\u092e"); //m
    
    inp = followed(inp, "\\u0079", "\\u092f"); //y
    inp = followed(inp, "\\u0072", "\\u0930"); //r
    inp = followed(inp, "\\u006c", "\\u0932"); //l
    inp = followed(inp, "\\u0076", "\\u0935"); //v
    inp = followed(inp, "\\u015b", "\\u0936"); //Å›
    inp = followed(inp, "\\u1e63", "\\u0937"); //á¹£
    inp = followed(inp, "\\u0073", "\\u0938"); //s
    inp = followed(inp, "\\u0068", "\\u0939"); //h
    
    
    //Medial Vowels
    
    //dipthongs first
    inp = inp.replace(/\\u0065/g, "\\u0947");   //e
    inp = inp.replace(/\\u0061\\u0069/g, "\\u0948");   //ai
    inp = inp.replace(/\\u006f/g, "\\u094b");   //o
    inp = inp.replace(/\\u0061\\u0075/g, "\\u094c");   //au
    
    inp = inp.replace(/\\u0069/g, "\\u093f");   //i
    //simple vowels
    
    inp = inp.replace(/\\u0101/g, "\\u093e");   //Ä
    inp = inp.replace(/\\u012b/g, "\\u0940");   //Ä«
    inp = inp.replace(/\\u0075/g, "\\u0941");   //u
    inp = inp.replace(/\\u016b/g, "\\u0942");   //Å«
    inp = inp.replace(/\\u1e5b/g, "\\u0943");   //á¹›
    inp = inp.replace(/\\u1e5d/g, "\\u0944");   //á¹
    
    
    inp = inp.replace(/\\u1e37/g, "\\u0962");   //á¸·
    inp = inp.replace(/\\u1e39/g, "\\u0963");   //á¸¹
    inp = inp.replace(/\\u1e43/g, "\\u0902");   //á¹ƒ
    inp = inp.replace(/\\u1e41/g, "\\u0902");   //á¹ƒ (dot above)
    inp = inp.replace(/\\u1e25/g, "\\u0903");   //á¸¥

    
    //final consonants
    inp = inp.replace(/\\u006b\\u0068/g, "\\u0916\\u094d");  //kh
    inp = inp.replace(/\\u006b/g, "\\u0915\\u094d");  //k
    inp = inp.replace(/\\u0067\\u0068/g, "\\u0918\\u094d"); //gh
    inp = inp.replace(/\\u0067/g, "\\u0917\\u094d"); //g
    inp = inp.replace(/\\u1e45/g, "\\u0919\\u094d"); //á¹…
    
    inp = inp.replace(/\\u0063\\u0068/g, "\\u091b\\u094d"); //ch
    inp = inp.replace(/\\u0063/g, "\\u091a\\u094d"); //c
    inp = inp.replace(/\\u006a\\u0068/g, "\\u091d\\u094d");//jh
    inp = inp.replace(/\\u006a/g, "\\u091c\\u094d"); //j
    inp = inp.replace(/\\u00f1/g, "\\u091e\\u094d");//Ã±
    
    inp = inp.replace(/\\u1e6d\\u0068/g, "\\u0920\\u094d");//á¹­h
    inp = inp.replace(/\\u1e6d/g, "\\u091f\\u094d");//á¹­
    inp = inp.replace(/\\u1e0d\\u0068/g, "\\u0922\\u094d");//á¸h
    inp = inp.replace(/\\u1e0d/g, "\\u0921\\u094d");//á¸
    inp = inp.replace(/\\u1e47/g, "\\u0923\\u094d");//á¹‡
    
    inp = inp.replace(/\\u0074\\u0068/g, "\\u0925\\u094d");//th
    inp = inp.replace(/\\u0074/g, "\\u0924\\u094d");//t
    inp = inp.replace(/\\u0064\\u0068/g, "\\u0927\\u094d");//dh
    inp = inp.replace(/\\u0064/g, "\\u0926\\u094d");//d
    inp = inp.replace(/\\u006e/g, "\\u0928\\u094d");//n
    
    inp = inp.replace(/\\u0070\\u0068/g, "\\u092b\\u094d");//ph
    inp = inp.replace(/\\u0070/g, "\\u092a\\u094d");//p
    inp = inp.replace(/\\u0062\\u0068/g, "\\u092d\\u094d");//bh
    inp = inp.replace(/\\u0062/g, "\\u092c\\u094d");//b
    inp = inp.replace(/\\u006d/g, "\\u092e\\u094d");//m
    
    inp = inp.replace(/\\u0079/g, "\\u092f\\u094d"); //y
    inp = inp.replace(/\\u0072/g, "\\u0930\\u094d"); //r
    inp = inp.replace(/\\u006c/g, "\\u0932\\u094d"); //l
    inp = inp.replace(/\\u0076/g, "\\u0935\\u094d"); //v
    
    inp = inp.replace(/\\u015b/g, "\\u0936\\u094d"); //Å›
    inp = inp.replace(/\\u1e63/g, "\\u0937\\u094d"); //á¹£
    inp = inp.replace(/\\u0073/g, "\\u0938\\u094d"); //s
    inp = inp.replace(/\\u0068/g, "\\u0939\\u094d"); //h
    
    //stri_unescape_unicode(inp)
    
    //Remove 'a'
    inp = inp.replace(/\\u0061/g, ""); //
    
    //Punctuation
    inp = inp.replace(/\\u002c/g, "\u0964");//,  previously inp = inp.replace(/\\u002c/g, "\\u0020\\u0964");
    inp = inp.replace(/\\u002e/g, "\u0965");//.  previously inp = inp.replace(/\\u002e/g, "\\u0020\\u0965");
    
    //Svaras
    inp = inp.replace(/\\u030e/g, "\\u1cda"); //dÄ«rga svarita
    inp = inp.replace(/\\u030d/g, "\\u0951"); //Svarita
    inp = inp.replace(/\\u0331/g, "\\u0952"); //anudÄtta
    
    //swap order of svara and visarga/anusvara
    //svarita
    inp = inp.replace(/\\u0951\\u0902/g, "\\u0902\\u0951");  //anusvara
    inp = inp.replace(/\\u0951\\u0903/g, "\\u0903\\u0951");  //visarga
    //anudatta
    inp = inp.replace(/\\u0952\\u0902/g, "\\u0902\\u0952");  //anusvara
    inp = inp.replace(/\\u0952\\u0903/g, "\\u0903\\u0952");  //visarga
    //dirga svarita
    inp = inp.replace(/\\u1cda\\u0902/g, "\\u0902\\u1cda");  //anusvara
    inp = inp.replace(/\\u1cda\\u0903/g, "\\u0903\\u1cda");  //visarga
    
    //candrabindu
    inp = inp.replace(/\\uf141\\uf141/g, "\\u0901"); //candrabindu on top/in middle of word
    inp = inp.replace(/\\uf141/g, "\\ua8f3"); //candrabindu at end of word
    
    //avagraha
    inp = inp.replace(/\\u02bc/g, "\\u093d"); //styled apostrophe
    inp = inp.replace(/\\u2019/g, "\\u093d"); //styled apostrophe
    inp = inp.replace(/\\u0027/g, "\\u093d"); //unstyled apostrophe
    
    //Numerals
    inp = inp.replace(/\\u0030/g, "\\u0966");
    inp = inp.replace(/\\u0031/g, "\\u0967");
    inp = inp.replace(/\\u0032/g, "\\u0968");
    inp = inp.replace(/\\u0033/g, "\\u0969");
    inp = inp.replace(/\\u0034/g, "\\u096a");
    inp = inp.replace(/\\u0035/g, "\\u096b");
    inp = inp.replace(/\\u0036/g, "\\u096c");
    inp = inp.replace(/\\u0037/g, "\\u096d");
    inp = inp.replace(/\\u0038/g, "\\u096e");
    inp = inp.replace(/\\u0039/g, "\\u096f");

    return fromUni(inp);
}

function fromUni(text) {
    "use strict";
    
    return text.replace(/\\u[\dA-F]{4}/gi,
        function (match) {
            return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
        }
    );
}

function toUni(input) {
    "use strict";
    var i, l;
    
    function pad_four(input) {
        var l = input.length;
        if (l === 0) {return '0000'; }
        if (l === 1) {return '000' + input; }
        if (l === 2) {return '00' + input; }
        if (l === 3) {return '0' + input; }
        return input;
    }
    var output = '';
    for (i = 0, l = input.length; i < l; i++) {output += '\\u' + pad_four(input.charCodeAt(i).toString(16)); }
    return output;
}