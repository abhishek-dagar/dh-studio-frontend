import { INSTALL_PS1_URL, INSTALL_SH_URL } from '../release/config';
import type { Os } from '../release/types';
import type { QueryState } from './download';

// The one line install commands, from the app repo's README. They fetch the
// right build, check it against the release checksums, install it and open the
// app, and the files carry no "downloaded from the internet" mark, so Gatekeeper
// and SmartScreen don't step in the way a browser download does.

export type InstallCommand = {
  /** `unix` covers macOS and Linux, which share the shell script. */
  readonly target: 'unix' | 'windows';
  /** The shell prompt shown before the command; never copied. */
  readonly prompt: string;
  readonly command: string;
};

export const UNIX_INSTALL: InstallCommand = {
  target: 'unix',
  prompt: '$',
  command: `curl -fsSL ${INSTALL_SH_URL} | sh`,
};

export const WINDOWS_INSTALL: InstallCommand = {
  target: 'windows',
  prompt: 'PS>',
  command: `irm ${INSTALL_PS1_URL} | iex`,
};

export const installCommandFor = (os: Os): InstallCommand => (os === 'windows' ? WINDOWS_INSTALL : UNIX_INSTALL);

/** One command for a picked OS, both when the query returns every system. */
export const installCommandsFor = (state: QueryState): readonly InstallCommand[] =>
  state.kind === 'os' ? [installCommandFor(state.os)] : [UNIX_INSTALL, WINDOWS_INSTALL];
