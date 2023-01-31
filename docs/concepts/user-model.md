---
sidebar_position: 3
sidebar_label: User Model
---

# User Model

A User in Xata can be a personal or system account that is identified by a unique email address.

Users can sign in to [Xata](https://app.xata.io) in any of the following ways:

- **Sign in with Github**: The primary email address associated with the Github account is used to log in to Xata
- **Sign in with Google:** The Gmail address associated with the Google account will be used to log in to Xata
- **Sign in with email:** A link to an authorization URL is dispatched to the requested email address

Upon initial sign in of a new User, Xata automatically creates their first Workspace.

A User that has the Owner or Maintainer role on a Workspace, can invite multiple other Xata Users as members in that Workspace.

Each User can create, or join by invite, any number of Workspaces within the specified [limits](/rest-api/limits#user-limits).

## User Roles

The following Workspace-level Roles are available for Users in Xata:

- **Owner:** Grants full permissions on all Workspace options. Only an Owner can assign or remove the Owner Role for other Users.
- **Maintainer:** Provides the same permissions with Owner, except for not being allowed to grant or remove the Owner Role for other Users. _The Maintainer Role is subject to change._

## Transferring Workspace Ownership

An Owner can assign the Owner role to another member in the Workspace. A Workspace can have multiple Owners at any given moment.
Subsequently, a new Owner can then edit the Role of other members, such as remove or modify the previous Owner's role.
