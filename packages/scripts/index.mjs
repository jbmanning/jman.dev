#!/usr/bin/env node

import {Command} from 'commander'
import {execa} from 'execa'
import fs from 'fs'

import path from 'path'
import {fileURLToPath} from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const json = JSON.parse(
	fs.readFileSync(path.join(__dirname, './package.json')).toString()
)

const program = new Command()

program
	.name('jman')
	.description(json.description ?? 'Unknown')
	.version(json.version ?? 'Unknown')

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
