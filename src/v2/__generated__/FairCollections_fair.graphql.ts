/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairCollections_fair = {
    readonly marketingCollections: ReadonlyArray<{
        readonly id: string;
        readonly slug: string;
        readonly " $fragmentRefs": FragmentRefs<"FairCollection_collection">;
    } | null>;
    readonly " $refType": "FairCollections_fair";
};
export type FairCollections_fair$data = FairCollections_fair;
export type FairCollections_fair$key = {
    readonly " $data"?: FairCollections_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairCollections_fair">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairCollections_fair",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 4
        }
      ],
      "concreteType": "MarketingCollection",
      "kind": "LinkedField",
      "name": "marketingCollections",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "FairCollection_collection"
        }
      ],
      "storageKey": "marketingCollections(size:4)"
    }
  ],
  "type": "Fair"
};
(node as any).hash = '39e214126b8900a7d665f6628d4c2fad';
export default node;
