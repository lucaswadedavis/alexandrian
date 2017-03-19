# Alexandrian

Boilerplate for using Google Cloud Functions (GCF) to post things to Github.
I use it to shuttle my reading list from Feedly through IFTTT and GCF
to a Github repo called `reading-list`.

You'll need to have created a GCF to deploy to.
Check [here](https://cloud.google.com/functions/docs/how-to) for instructions.

In the config file, you'll need to replace `username` with your Github username
and if your target repo is named something other than `reading-list`
you'll need to change that too.

The token you can get by following [these instructions](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/).

## How to Deploy:

The following code will deploy the cloud function,
but will error out if the exported function isn't actually called
alexandrian.

```
gcloud alpha functions deploy alexandrian\
--source-url https://source.developers.google.com/p/<<<project name goes here>>>/r/alexandrian/ \
--source-path "/" --trigger-http \
--memory 128MB \
--entry-point alexandrian
```
And to call it:
```
gcloud alpha functions call alexandrian \
--data '{"title":"Test Title","url":"https://test","content":"Test Content"}'
```
