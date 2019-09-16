const w = 1000;
const h = 600;
const m = 50;

const path = d3.geoPath();

const content = d3.select('body');

content.append('h1')
	.attr('id', 'title')
	.text('United States Educational Attainment');

content.append('h2')
	.attr('id', 'description')
	.text('Percentage of adults age 25 and older with a bachelor\'s degree or higher (2010-2014)');

const tooltip = content.append('div')
	.attr('id', 'tooltip')
	.style('position', 'absolute')
	.style('opacity', 0);

const svg = content.append('svg')
	.attr('width', w)
	.attr('height', h);

const legend = svg.append('g')
	.attr('id', 'legend');

Promise.all([
	d3.json('https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json'),
	d3.json('https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json')
]).then(([dataCounties, dataEducation]) => {

	data.map(function(d) { d.id = d.values.id; });

	const min = d3.min(dataEducation, d => d.bachelorsOrHigher);
	const max = d3.max(dataEducation, d => d.bachelorsOrHigher);

	const colorArray = [...Array(4)];
	const colors = colorArray.map((color, index) => (index + 1) * (max - min) / (colorArray.length - 1));

	const colorScale = d3.scaleSequential(d3.interpolateRainbow)
		.domain(d3.extent(dataEducation, d => d.bachelorsOrHigher));

	const legendScale = d3.scaleBand()
		.domain(colors)
		.range([0, 400]);

	d3.select('#legend')
		.selectAll('rect')
		.data(colors)
		.enter()
		.append('rect')
		.attr('x', d => legendScale(d))
		.attr('y', 0)
		.attr('width', legendScale.bandwidth())
		.attr('height', 40)
		.attr('fill', d => colorScale(d));

	d3.select('svg')
		.selectAll('path')
		.data(topojson.feature(dataCounties, dataCounties.objects.counties).features)
		.enter()
		.append('path')
		.attr('d', path)
		.attr('class', 'county')
		.attr('fill', d => colorScale(dataEducation.find(currentDataEducation => currentDataEducation.fips === d.id).bachelorsOrHigher))
		.attr('data-fips', d => d.id)
		.attr('data-education', d => {
			return dataEducation.find(currentDataEducation => currentDataEducation.fips === d.id).bachelorsOrHigher;
		})
		.on('mouseover', d => {
			tooltip.attr('data-education', dataEducation.find(currentDataEducation => currentDataEducation.fips === d.id).bachelorsOrHigher)
				.style('left', d3.event.pageX + 15 + 'px')
				.style('top', d3.event.pageY - 25 +'px')
				.style('transition', 'opacity .5s ease-out')
				.style('opacity', .8)
				.html(() => `<strong>Education</strong> : ${education.bachelorsOrHigher}%`);
		})
		.on('mouseout', function () {
			tooltip.style('opacity', 0);
		});

	const legendAxis = d3.axisBottom(legendScale)
		.tickFormat(temp => temp.toFixed(2));

	svg.append('g')
		.attr('id', 'legend-axis')
		.call(legendAxis);
});