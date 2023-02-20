---
sidebar_position: 1
sidebar_label: SDK Overview
---

# Python SDK

The Python SDK is available as a [PyPI package](https://pypi.org/project/xata/)

> ⚠️ This SDK is in active development and is not yet ready for production use, subscribe to [this GitHub ticket](https://github.com/xataio/xata-py/issues/24) to get updates on the road to GA.

The Python SDK uses type annotations and requires Python 3.8 or higher. You can read more about the Python SDK in its [API reference](https://xata-py.readthedocs.io).

## Installation

To install the library:

```bash
pip install xata
```

## Configuration

### Authorization

There are multiple options to pass your Xata credentials to the client. Xata will check following this order of precedence:
1. Parameters passed to the constructor
2. Environment variables
3. The `.env` file
4. Via `.xatarc` configuration file

#### Parameters

Inject the API key and workspace `id` directly into the constructor as parameters:

```python
from xata.client import XataClient

client = XataClient(api_key="REDACTED_API_KEY", workspace_id="REDACTED_WS_ID")
```

#### Environment Variables

If no parameters were passed, the client probes the following environment variables for authentication.

```bash
export XATA_API_KEY="REDACTED_API_KEY"
export XATA_WORKSPACE_ID="REDACTED_WS_ID"
```

```python
from xata.client import XataClient

client = XataClient()
```

#### dotenv

If the previous options were empty, the client looks for a `.env` file in the project root directory. Visit the [authentication](/cli/authentication) page to read more about best practices.

```bash
XATA_API_KEY="REDACTED_API_KEY"
XATA_WORKSPACE_ID="REDACTED_WS_ID"
```

#### xatarc configuration file

The `.xatarc` configuration file is the final source to retrieve the API key and the workspace. 
Please refer to the [authentication](/cli/authentication) page to learn more about the `.xatarc` file and best practices.

## Logging

The SDK build on top of the [requests](https://pypi.org/project/requests/) package has support for logging baked in. Out of the box you can see the URL and status code by setting the log level to `DEBUG`.