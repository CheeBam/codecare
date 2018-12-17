# Events

## Project setup

- Install [Docker](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/#install-compose). **Note:** Install Docker Compose only for Linux, for MacOS and Windows it already included in Docker.
- Clone repo
- Copy and rename environment file `cp .env-example .env`
- Run `docker-compose up --build`

## Requirements

!["Layout"](http://oi66.tinypic.com/vo3ihf.jpg "Layout")

1    User should be able to view calendar with layout similar to one displayed on image

 - Conflicting events should be the same width, and should not overlap 
 - Max event width is `200px`
 - Event background color is `#E2ECF5` with `#6E9ECF` border
 color 
 - Event font is `Open Sans, 14px` 
 - Calendar time font is Open Sans with around `200` font weight, `16px` large, `12px` small. 
 - Titles should be 1 line and should not overflow outside the calendar-event box. If the title is too long to fit, ellipsis (“...”) should be used. 
 - Events will be between 8am to 5pm (there’s a label for 5pm but events will not exceed 5pm) 
 - Calendar will cover only one same day 
 
2    User should be able to add/remove events from his calendar 

3    User should be able to export his calendar in JSON as follows:

```
[
	{
		"start": 0,
		"duration": 15,
		"title": "Exercise"
	},
	{
		"start": 25,
		"duration": 30,
		"title": "Travel to work"
	},
	{
		"start": 30,
		"duration": 30,
		"title": "Plan day"
	},
	{
		"start": 60,
		"duration": 15,
		"title": "Review yesterday's commits"
	},
	{
		"start": 100,
		"duration": 15,
		"title": "Code review"
	},
	{
		"start": 180,
		"duration": 90,
		"title": "Have a lunch with John"
	},
	{
		"start": 360,
		"duration": 30,
		"title": "Skype call"
	},
	{
		"start": 370,
		"duration": 45,
		"title": "Follow up with designer"
	},
	{
		"start": 405,
		"duration": 30,
		"title": "Push up branch"
	},
]
```

4   User should be able to login and persist his inputs between logins 

5   Solution should be provided as a link to git repository 
