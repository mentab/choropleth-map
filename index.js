const w = 800;
const h = 800;
const m = 50;

const svg = d3.select('svg')
	.attr('width', w)
	.attr('height', h);

Promise.all([
	d3.json('https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json'),
	d3.json('https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json')
]).then((datas) => {
	const dataCounties = datas[0];
	const dataEducation = datas[1];

	console.log(dataCounties);
	console.log(dataEducation);
});