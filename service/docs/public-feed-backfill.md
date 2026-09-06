# Public-feed attribute backfill

This is a non-public, dev-only maintenance command. It is **dry-run by default** and requires an
explicit `--stage dev` plus `SERVICE_POSTS_DYNAMODB_TABLE`; it does not accept production.

```sh
SERVICE_POSTS_DYNAMODB_TABLE=dev-service-posts-2019-01-11 \
  yarn workspace @randy.tarampi/service backfill:public-feed \
  --stage dev --checkpoint /tmp/me-public-feed.json --page-size 25 --delay-ms 100
```

The scan projects only the status, identity, source, type and date fields needed to derive the two
synthetic attributes. The command reports `updated`, `skipped`, `invalid` and `pages` counts and
writes a resumable checkpoint after each page. Existing matching attributes are skipped. A future
mutation run requires the separately reviewed `--write` flag; do not use it without explicit
parent confirmation.
