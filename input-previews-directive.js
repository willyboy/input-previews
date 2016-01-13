
angular.module('input-previews',[]).directive('inputPreviews',function(){
	return{
		restrict: "A",
		link: function($scope, $el, $attr){
			var res = $scope.$eval($attr.previewInputFunctionality),
				inputGroupDelay = parseInt($attr.inputGroupDelay)||750,
				totalTime = 0,
				flatArray = [],
				timeoutIds = [];
				
			function clearOnFocus(){
				timeoutIds.forEach(function(id){
					clearTimeout(id);
				});
				timeoutIds.length = 0;
				res.forEach(function(obj){
					$(obj.selector).val("").off("focus",clearOnFocus)
				});
			}
			
			function showCharacters(el, word, time){
				var timePerWord = Math.floor(time/word.length);
				for(var i = 1; i<=word.length; i++){
					(function(i){
						timeoutIds.push(setTimeout(function(){
							el.val(word.substr(0,i)).trigger("change");
						},i*timePerWord));
					}(i));
				}
			}
			
			res.forEach(function(obj,index){//2n, 2n+1, 2n+2
				if(eval($attr.clearOnFocus)){
					$(obj.selector).on("focus",clearOnFocus);
				}
				obj.wordsAndTimes.forEach(function(wat,subIndex){
					wat.selector = obj.selector;
					flatArray.splice(index+(res.length*subIndex),0,wat);
				});
			});

			for(var i = 0, len = res.length; i<len; i++){
				//calculate keepAlive time (the length of time from when the text is displayed 
				//to when the text is cleared)
				var sliceArr = flatArray.slice(len*i, len+(i*len)).reverse(),
					totalTTL = 0;
				sliceArr.forEach(function(el){
					el.keepAlive = totalTTL+el.time;
					totalTTL+=el.time;
				});
			}
			
			flatArray.forEach(function(wat,index){
				timeoutIds.push(setTimeout(function(){
					showCharacters($(wat.selector),wat.word,wat.time)
					timeoutIds.push(setTimeout(function(){
						$(wat.selector).val("");
					},wat.keepAlive+inputGroupDelay));
				},totalTime+(index>res.length-1?Math.floor(index/res.length)*inputGroupDelay:0)));
				totalTime += wat.time;
			});
		}
	}
});
