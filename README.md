# Segment Agent Dispatcher

[![](https://img.shields.io/badge/TrustOSS-0.2.0-green.svg)](http://trustoss.org)

A node.js tool / collection of simple docker api servers that dispatch basic data to Segment.io

### Table of Contents

- [Installation](#installation)
- [Usage / API](#usage--api)
- [Troubleshooting](#troubleshooting)
- [FAQs](#faqs)
- [Team](#team)
- [Contact](#contact)
- [Additional Resources](#additional-resources)
  - [Project Changelog](/CHANGELOG.md)
  - [Contributing Guide](/CONTRIBUTING.md)
  - [Code of Conduct](/CODEOFCONDUCT.md)
  - [Project License](/LICENSE.md)

### Installation

#### Requirements

- Docker
- `docker-compose`
- Open ports:
  - `8000` - Client/API of dispatcher itself

#### Steps

1. Clone the repo
2. Build the images. In the root of the folder, run `docker-compose build`
3. Run the images. In the root of the folder, run `docker-compose up`

### Usage / API

#### Client

As located at http://docker.therebelrobot.com:8000. Available agents are listed in the dropdowns. 

#### Dispatcher API

**Endpoints: **

- `POST` `/` - Accepts JSON input, must include `writeKey' (valid Segement key), `library` (valid agent library), and `data` (valid JSON, which in turn has `type`, a valid Segment method.)

#### Agents
##### Node.js

Status: Completed. Can send custom data to any Segment account.

##### Golang

Status: Completed. Can send data to any Segment account, but only of a specific type.

*** PHP, Python, and Ruby servers are running, but not connected to Segment***

### Team

- Trent Oswald (lead) - [@therebelrobot](https://github.com/therebelrobot)

### Contact

The main method to contact the project lead, whether by email, Slack, IRC, carrier pidgeon or smoke signal.

Feel free to chat with me about this project by either opening an issue here on the repository, or by emailing me at `trentoswald``@``therebelrobot.com`.

### Additional Resources

- [Project Changelog](/docs/CHANGELOG.md)
- [Contributing Guide](/docs/CONTRIBUTING.md)
- [Code of Conduct](/docs/CODEOFCONDUCT.md)
- [Project License](/docs/LICENSE.md)
