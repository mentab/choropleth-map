const w = 800;
const h = 800;
const m = 50;

const projection = d3.geoMercator();

const path = d3.geoPath().projection(projection);

const content = d3.select('body');

const svg = content.append('svg')
	.attr('width', w)
	.attr('height', h);

Promise.all([
	d3.json('https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json'),
	d3.json('https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json')
]).then(([dataCounties, dataEducation]) => {

	console.log(dataCounties);
	console.log(dataEducation);

	d3.select('svg')
		.selectAll('path')
		.data(topojson.feature(dataCounties, dataCounties.objects.counties).features)
		.enter()
		.append('path')
		.attr('d', path)
		.attr('fill', 'red');
});