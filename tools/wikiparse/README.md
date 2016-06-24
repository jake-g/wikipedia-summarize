# Wikipedia Parser
Parses wikipedia into JSON with sections including text, links and images

### Install
* clone repository and `cd` into it
* `npm install wikiparse -g`

### Usage
* Run: `wikiparse --article=[article_name]`
* Or: `wikiparse --url=[full_article_url]`
* Output: `article_name.json` file is created in the current directory

### JSON Example
```
{
    "title": "TITLE",
    "links": {
        "LINK REF": {
            "title": "link title",
            "occurrences": "number of link occurences",
            "text": "link text"
        }
    },
    "sections": {
        "SECTION NAME": {
            "text": "text for the section and [[LINK REF]] which is referenced above",
            "images": ["http://IMAGE.jpg"]
        }
    }
}
```
