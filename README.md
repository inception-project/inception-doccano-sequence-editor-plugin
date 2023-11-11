# INCEpTION Doccano Sequence Editor Plugin

**Note: This is an early access repository. The way that things work will likely be subject to regular changes for the time being.** 

![Screenshot](screenshot.png)

This repository is an example based on the [doccano](https://doccano.herokuapp.com) JavaScript editor component of how to integrate a JavaScript-based annotation editor with INCEpTION.

Starting with INCEpTION v23, external editor plugins are supported. To use this editor, first create a folder named `editors` in your INCEpTION application home. By default, this is `~/.inception`, but on server installations, you will usually have set it to something else such as `/srv/inception`.

Clone this repository as a sub-folder under the `editors` folder.

tl;dr: 

```
$ cd ~/.inception
$ mkdir editors
$ cd editors
$ git clone https://github.com/inception-project/inception-doccano-sequence-editor-plugin.git
```

Finally, start INCEpTION. Early during start-up, you should see a message like this:

```
ExternalEditorLoader - Loading editor plugin: Doccano Sequence (external)
```

Also, on the annotation page, you should be able to switch to that editor.

If a document was imported as a HTML file, the editor should display the HTML layout of the file.

### Requirements

- This repository requires NodeJS 16 to build.
- INCEpTION 29.8 or higher
