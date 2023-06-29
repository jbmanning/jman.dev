#!/usr/bin/env node

import {Command} from 'commander'
import {execa} from 'execa'
import json from './package.json' assert {type: 'json'}

const program = new Command()

program.name('jman').description(json.description).version(json.version)

program
	.command('is-git-clean')
	.description(
		'exits with non-zero exit code if git status is not clean. Uses `git status --porcelain` to determine.'
	)
	.action(async () => {
		const {stdout} = await execa('git', ['status', '--porcelain'])
		if (stdout) {
			console.warn(stdout)
			console.warn('git working directory not clean... exiting.')
			process.exit(1)
		}
	})

program.parse()
