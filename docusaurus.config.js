// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */
const config = {

	title: 'Metaculus Documentation',
	url: 'https://ryooan.github.io',
	baseUrl: '/faq/',
	onBrokenLinks: 'warn',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.ico',
	
	//Github deployment settings
	projectName: 'faq',
	organizationName: 'ryooan',
	trailingSlash: false,
	
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},
	
	presets: [
		[
		  //'classic',
		  '@docusaurus/preset-classic',
		  ({
			docs: {
				routeBasePath: '/', // Serve the docs at the site's root
				path: 'docs',
				sidebarPath: require.resolve('./sidebars.js'),
				
				remarkPlugins: [math],
				rehypePlugins: [katex],
			  // MIGHT BE NICE TO ALLOW SUGGESTED EDITS?
			  // Please change this to your repo.
			  // Remove this to remove the "edit this page" links.
			  //editUrl:
			  //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
			},
			blog: false, /** {
			  showReadingTime: true,
			  // Please change this to your repo.
			  // Remove this to remove the "edit this page" links.
			  editUrl:
				'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
			},*/
			theme: {
			  customCss: require.resolve('./src/css/custom.css'),
			},
		  }),
		],
	],
  
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        items: [
          {
            type: 'doc',
            docId: 'basics/platform',
            position: 'left',
            label: 'Documentation',
          },
		  {
            position: 'left',
            label: 'Tools and Resources',
			to: '/tools'
          },

        ],
      },
	prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
	},
	/* not sure if it's more or less usable with autocollapse
	docs: {
	  sidebar: {
		autoCollapseCategories: true,
	  },
	},
	*/
    }),
	
	plugins: [
		[
		  '@docusaurus/plugin-content-docs',
		  {
			id: 'docs-guides',
			path: 'docs-guides',
			routeBasePath: 'docs-guides',
			sidebarPath: require.resolve('./sidebars.js'),
			
			remarkPlugins: [math],
			rehypePlugins: [katex],
		  }, 
		],
	],

	stylesheets: [
		{
		  href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
		  type: 'text/css',
		  integrity:
			'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
		  crossorigin: 'anonymous',
		},
	],
	
	scripts: [
		// String format.
		//https://docusaurus.io/script.js',
		// Object format.
		
		//NEED TO FIGURE OUT A BETTER SOLUTION THAN THE BELOW SINCE THIS ADDS IT TO THE HEAD OF ALL PAGES AND THAT'S PROBABLY NOT IDEAL FOR LOAD TIMES. DISABLING FOR NOW SINCE I CAN'T FIGURE OUT HOW TO GET THE SCORING PAGE TO WORK.
		
		
		{
		  src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js',
		  /* async: true, */
		//  defer: true,
		},
		{
		  src: 'https://d3js.org/d3.v3.min.js',
		  //async: true,
		  //defer: true,
		},
		{
		  src: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML',
		//  /*async: true, */
		//  defer: true,
		}, 
		//{
		//  src: '/faq/script/score-script.js',
		  //src: 'https://raw.githubusercontent.com/ryooan/ryooan.github.io/master/assets/score-script.js',
		  /* async: true, */
		//  defer: true,
		//},
		{
		  src: '/faq/script/jquery.csv.js',
		  /* async: true, */
		//  defer: true,
		},
		//{
		//  src: '/faq/script/mod-tool-script.js',
		//  async: true,
		//  defer: true,
		//},
	  ],
	
	
};

module.exports = config;
