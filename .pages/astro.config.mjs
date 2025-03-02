// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Objective-R',
			description: 'A superset of Rust with enhanced object-oriented features',
			social: {
				github: 'https://github.com/sufremoak/objective-r',
			},
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', link: '/guides/introduction/' },
						{ label: 'Installation', link: '/guides/installation/' },
						{ label: 'Quick Start', link: '/guides/quickstart/' },
					],
				},
				{
					label: 'Core Concepts',
					items: [
						{ label: 'Objects & Classes', link: '/concepts/objects-classes/' },
						{ label: 'Implementation', link: '/concepts/implementation/' },
						{ label: 'Memory Management', link: '/concepts/memory-management/' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
