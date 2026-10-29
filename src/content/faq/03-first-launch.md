---
order: 3
question: Why does my system warn me the first time I open it?
link: { label: Install guides for each system, href: /docs/install/ }
---
The builds aren't code signed yet, so macOS and Windows can't vouch for them and ask you to confirm once.

On macOS, move DH Studio to your Applications folder, then run xattr -cr "/Applications/DH Studio.app" in Terminal and open it again. On Windows, choose More info, then Run anyway.

On Linux, make the AppImage executable first with chmod +x, then open it.
