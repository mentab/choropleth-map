const w = 1000;
const h = 600;
const m = 50;

const path = d3.geoPath();

const content = d3.select('body');

const svg = content.append('svg')
	.attr('width', w)
	.attr('height', h);

Promise.all([
	d3.json('https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json'),
	d3.json('https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json')
]).then(([dataCounties, dataEducation]) => {
	d3.select('svg')
		.selectAll('path')
		.data(topojson.feature(dataCounties, dataCounties.objects.counties).features)
		.enter()
		.append('path')
		.attr('d', path)
		.attr('class', 'county')
		.attr('data-fips', d => d.id)
		.attr('data-education', d => 'data-education');
});