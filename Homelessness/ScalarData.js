var pagesContent = {};

$( document ).ready( function() {
	String.prototype.splice = function(idx, rem, str) {
	    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
	};
	   	
	scalarapi.setBook( "http://scalar.usc.edu/works/homelessness/index" );
	   		
	if ( scalarapi.loadNode( "index", true, handleSuccess, handleFailure, 1 ) == "loaded" ) {
		handleSuccess();
	};    
	  			
	function handleSuccess() {
		var node = scalarapi.getNode("index");
		
		var pathContents = node.getRelatedNodes( "path", "outgoing" );

		for(var i = 0; i < pathContents.length; i++){
			var name = pathContents[i].current.title;
			var content = pathContents[i].current.content;
			content = content.replace(/&quot;/g, '"');
			content = content.replace(/&#39;/g, "'");
			content = content.replace(/<p>/g, "");
			
        	pagesContent[name] = [];
        	pagesContent[name][0] = content;
        }
       
       separateQuotes();
	}
	   		
	function handleFailure() {
		$( "body" ).append( "<p>The node could not be loaded.</p>" );
	}
	
	function separateQuotes(){
		var searchString = "<br /><br />";
		for(var name in pagesContent){
			var text = pagesContent[name][0];
			
			for (var j = 0; text != ""; j++){
				var quoteIndex = text.indexOf(searchString);
				
				var quote = "";
				if(quoteIndex > 0) quote = text.substring(0, quoteIndex);
				else{
					quote = text;
					quote = quote.trim();
					quote = EnterString(quote);
					
					pagesContent[name][j] = quote;
					break;
				}
				quote = quote.trim();
				quote = EnterString(quote);
				
				pagesContent[name][j] = quote;
				
				text = text.substring(quoteIndex + searchString.length, text.length);
			}
		}
	}
	
	function EnterString(quote){
		var hit20 = false;
		for(var s = 0; s < quote.length; s++){
			if(s % 20 == 0){
				if(quote[s] === ' ')
					quote = quote.splice(s, 0, "\n");
				else
					hit20 = true;
			}
			else if(hit20){
				if(quote[s] === ' '){
					quote = quote.splice(s, 0, "\n");
					hit20 = false;
				}
			}	
		}
		return quote;
	}
	
	function displayQuote(){
		for(var i = 0; i < pagesContent.length; i++){
			for(var j = 0; j < pagesContent[i].length; j++){
				$( "body" ).append( "<p>" + pagesContent[i][j] + "</p>" );
			}
		}
	}
});