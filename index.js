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
		.attr('data-education', d => {
			education = dataEducation.find(currentDataEducation =>  currentDataEducation.fips === d.id);
			return education ? education.bachelorsOrHigher : 0;
		})
		.on('mouseover', d => {
			education = dataEducation.find(currentDataEducation =>  currentDataEducation.fips === d.id);
			console.log(education);
			tooltip.attr('data-education', education ? education.bachelorsOrHigher : 0)
				.style('left', 0 + 'px')
				.style('top', 0 + 'px')
				.style('transition', 'opacity .5s ease-out')
				.style('opacity', .8)
				.html(() => `Education : <em style='color:red'>${education ? education.bachelorsOrHigher : 0}</em>`);
		})
		.on('mouseout', function () {
			tooltip.style('opacity', 0);
		});;
});