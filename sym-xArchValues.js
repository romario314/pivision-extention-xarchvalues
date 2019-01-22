/*
Purpose of component is to show PI archived values for a period of time for a list of rare updated items (tags or AF attributes)
 with ability to limit number of recent values.
This can be used for showing recent laboratory data, as it comes usually not frequently (e.g. once per month).

*/

(function (PV) {
	"use strict";

	function symbolVis() { };
	PV.deriveVisualizationFromBase(symbolVis);

	var definition = {
		typeName: "xArchValues",
		visObjectType: symbolVis,
		datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Multiple,
		iconUrl: '/Scripts/app/editor/symbols/ext/icons/sym-xArchValues-icon.svg',
		getDefaultConfig: function(){
			return {
				DataShape: "Timeseries",
				Height: 150,
				Width: 150,
				TopHeaderColor: "#55CCFF",
				LeftHeaderColor: "#7FFFD4",
				NumberOfValues: 5
			}
		},
		configOptions: function(){
			return [
				{
					title: "Format Table",
					mode: "format"
				}
			];
		}
	};
	
	symbolVis.prototype.init = function(scope, elem) {
		this.onDataUpdate = dataUpdate;
		function dataUpdate(data){
			//console.log(data);
			if (!data) return; //exit if data is null
			var firstAttribute = data.Data[0]; // 0-element always exist
			//console.log("data.Data.lenth=" + data.Data.length);
			
			// we need sporadic update with full data
			if (firstAttribute.Label) {
				//sporadic update
				scope.FullData = data.Data;
				//console.log(data.Data);
			}
		}
	};

	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 
