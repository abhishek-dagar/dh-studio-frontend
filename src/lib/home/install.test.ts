import { describe, expect, it } from 'vitest';
import { installCommandFor, installCommandsFor, UNIX_INSTALL, WINDOWS_INSTALL } from './install';

describe('install commands', () => {
  it('match the app README', () => {
    expect(UNIX_INSTALL.command).toBe(
      'curl -fsSL https://github.com/OnlyDev-India/data-hive-studio/releases/latest/download/install.sh | sh',
    );
    expect(WINDOWS_INSTALL.command).toBe(
      'irm https://github.com/OnlyDev-India/data-hive-studio/releases/latest/download/install.ps1 | iex',
    );
  });

  it('gives macOS and Linux the shell script and Windows the PowerShell one', () => {
    expect(installCommandFor('macos')).toBe(UNIX_INSTALL);
    expect(installCommandFor('linux')).toBe(UNIX_INSTALL);
    expect(installCommandFor('windows')).toBe(WINDOWS_INSTALL);
  });

  it('shows one command for a picked OS and both for every system', () => {
    expect(installCommandsFor({ kind: 'os', os: 'windows', detected: true })).toEqual([WINDOWS_INSTALL]);
    expect(installCommandsFor({ kind: 'all' })).toEqual([UNIX_INSTALL, WINDOWS_INSTALL]);
  });
});
