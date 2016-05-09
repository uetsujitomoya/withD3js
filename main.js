var viewer = new Cesium.Viewer('cesiumContainer');
var getCSV = d3.dsv(',', 'text/csv; charset=shift_jis');
getCSV('mapnavoskdat_kouen.csv', (data) => {
  var size = d3.scale.linear()
  .domain(d3.extent(data, (item) => +item['2010年']))
  .range([1, 30]);
  var hue = d3.scale.linear()
  .domain(d3.extent(data, (item) => +item['施設ID']))
  .range([2 / 3, 0]);
  data.forEach((item) => {
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(item['X'], item['Y'], 0),
      point : {
        pixelSize : 5,
        color : Cesium.Color.fromHsl(hue(item['施設ID']), 1, 0.5)
      },
      label : {
      	text : item['施設名'],
        font : '8pt monospace',
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth : 2,
        verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
        pixelOffset : new Cesium.Cartesian2(0, -9)
      }
    });
  });
  viewer.zoomTo(viewer.entities);
});
