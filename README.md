# Wikipedia Parser
Parses wikipedia into JSON with sections including text, links and images

### Install
* clone repository and `cd` into it
* `npm install wikisummarize -g`

### Usage
* Run: `wikisummarize [arguments]`

##### Required Arguments:
* `--article=[article name]`
OR
* `--url=[full article url]`

##### Optional Arguments:
* `--section=[article section]`
* `-n=[number of top results]`

### Example

```
$ wikisummarize --article=Cat --section="Feral cats" -n 5

Fetching article Cat...
Summarizing section Feral cats from article Cat...
Analyzing keywords...
Building summary...
Done!

----Top 5 keywords----
Score	Keyword
(2.48)	feral
(1.66)	cat
(1.46)	leukemia
(1.46)	medical
(1.3)	common

----Article Summary----
The numbers of feral cats is not known, but estimates of the US feral population range from 25 to 60 million.
Feral cats may live alone, but most are found in large Feral cat colony, which occupy a specific territory and are usually associated with a source of food.
Famous feral cat colonies are found in Rome around the Colosseum and Forum Romanum, with cats at some of these sites being fed and given medical attention by volunteers.
One common approach to reducing the feral cat population is termed'trap-neuter-return', where the cats are trapped, Neutering, Immunization against rabies and the Feline leukemia virus, and then released.
Before releasing them back into their feral colonies, the attending veterinarian often nips the tip off one ear to mark it as neutered and inoculated, since these cats may be trapped again.
```
