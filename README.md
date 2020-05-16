# lxad.cf
Short links for Linguistics After Dark show notes

## Why this?

We have a hard limit of 4000 characters for our show notes and a lot of times we're citing papers with very long URLs, so we needed a way to cut those links down. This is a link-shortening service to help us with that.

## How do I add a link to be shortened?

Open _links.yaml_ and you'll see that the file is divided between general links and episode links. There's no actual difference there; it's just for bookkeeping. Let's say you're going to add a link for an episode. Here's the format to use:

```yaml
- slug: 1-quiz3
  href: https://allthingslinguistic.com/post/617601769928818688/which-indo-european-subfamily-are-you
  disabled: false
  title: Indo-European Subfamily Quiz
  comment: >-
    This is a buzzfeed quiz that Gretchen McC posted to find out what Indo-European Subfamily
    everyone is. I got Germanic.
```

Here's what each field is:

| Field | Required? | Description | Notes |
| --- | --- | ---- | --- |
| `slug` | Required | The part that goes after `http://lxad.cf/` for this link | For episode links, use the format "X-topicY", where X is the episode number and Y (optionally) is the number of links on that topic. For example, `1-quiz3` is the third link about the quiz on the first episode. |
| `href` | Required | The URL to redirect to | Put in the whole URL, including `http://` or `https://` |
| `disabled` | Optional | If `true`, disable this link | Not yet implemented |
| `title` | Optional | A title describing the link | We don't do anything with this yet |
| `comment` | Optional | A multi-line comment describing the link (don't forget to start it with `>-`) | We don't do anything with this yet |

## How do I deploy this?

Just push to the _master_ branch. Heroku will automatically deploy a new version on push to _master_.

> **Important note:** Do not change the name of the `PORT` environment variable! Heroku expects to populate that variable so it can run its internal wizardry correctly.

## That sounds suspiciously like architecture. Say more about that?

Sure! This is a Node service built on Koa (though honestly it's so tiny it could use anything) and deployed on Heroku, mostly 'cause Heroku is free and I don't anticipate this getting a lot of traffic. Also it turns out .cf domains are free, which is neat because it lets us make a nice URL referencing [the "cf." notation that means "see/compare further"](https://en.wikipedia.org/wiki/Cf.).

When the server starts, it reads in the list from _links.yaml_ and starts up on the port given by the environment variable `PORT`.

When a request comes in, the server looks at the path, matches it against the `slug` field in the list of links. If it matches one, it responds with a 301 and a `Location:` header to the `href` on that link. Otherwise, it responds with a 404.

## Why are the links configured in YAML instead of JSON, given that this is a Node project?

Long story short, it's left over from when I thought I could do this on GitHub pages (but I couldn't because it would require a non-approved plugin). I left it in YAML because I thought it would be more user-friendly to the other people who use this to add links.

# TODO

- [ ] Add a homepage of some kind at _/_
- [ ] Add brand-appropriate styling to the 404 page
- [ ] Add analytics of some kind (maybe?)
