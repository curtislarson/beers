# 🍺 Beers - Drinkin' All Over the World

An attempt to make a visualization from my years of travel & Untappd checkins. It's still a work in progress!

## Architecture

- SPA with React
- Deno for data scripts
- GitHub actions for automation
- Hosted on cloudflare pages

## Untappd Data Preparation

Getting all the data I wanted for each checkin without having to ad hoc query the Untappd API was a bit of a task. Thankfully Untappd provides an [export feature for insiders](https://help.untappd.com/hc/en-us/articles/360034506171-Where-can-I-find-the-Exportable-Data-feature-) which got me almost there. However the export does not have beer image labels and its sent to an email address which would have been a pain to write a connector for that.

Instead I ran an initial export to retrieve the bulk of my data and queried the `beer_url` link for each checkin and extracted the `og:image` meta tag to retrieve the beer label url. I stored the `beer_id`, `image_url` combo in a cockroachdb database for safe keeping until I was ready to add it to the rest of the JSON data. This took a bit of time and I had to use some backoff logic to prevent getting requests denied. Not sure if there was a better way for the amount of data that I needed to fetch.

Even with the export complete I still needed a method to periodically hit the Untappd api to retrieve checkins that occurred since the initial export. That just ended up being a simple scheduled github action that hit the [User Activity Feed](https://untappd.com/api/docs#useractivityfeed) api. Thankfully that api returns beer image labels along with the rest of the information I needed. I couldn't just use that api to pull all data because it limits you to the most recent `200` or so checkins from what I remember.

The GitHub action that hit the api would add any new entries to the json data file, create a PR, and then merge the PR into the repo. That would in turn trigger a deployment so the website now had the ability to update itself.

## Trip Data

Fortunately i've been a member of [Nomad List](https://nomadlist.com/) for quite a few years and have kept my travel profile up to date. They allow you to export all your trips to a `.csv` file which just needed a bit of data cleaning before I could integrate it into the map. This wasn't completely necessary but it does give a nice overall view and separation of different parts of my travel that I otherwise would have had to construct manually from checkin data. The data only goes back 3 or so years though.

## TODO

- [x] Connect cloudflare pages to github and verify deployment
- [x] Fetch images from urls and upload to blob store
- [x] Deploy scheduled job to pull incrementally (default last 50 beers should be good enough)
- [x] Have filter for checkins based on the current trip
- [x] Convert nomadlist trip data into select categories where checkins are partitioned based on the date range
- [x] Filter right side list
- [ ] When you select a trip filter the "Unique Countries" stats should be removed, or just remove that stat all together
- [ ] In general stats should update to be useful in the current context
- [ ] Include "globe view"?
  - Would need to relearn `kml`
- [ ] Some sort of "navigation" or "auto driver" mode where it slowly goes from beer to beer and navigates around the map? Similar to my 1000 beer party.
