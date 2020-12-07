/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type DisableFactorConfirmation_me = {
    readonly appSecondFactors: ReadonlyArray<({
        readonly internalID: string;
        readonly name: string | null;
        readonly __typename: "AppSecondFactor";
    } | {
        /*This will never be '%other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    }) | null> | null;
    readonly " $refType": "DisableFactorConfirmation_me";
};
export type DisableFactorConfirmation_me$data = DisableFactorConfirmation_me;
export type DisableFactorConfirmation_me$key = {
    readonly " $data"?: DisableFactorConfirmation_me$data;
    readonly " $fragmentRefs": FragmentRefs<"DisableFactorConfirmation_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DisableFactorConfirmation_me",
  "selections": [
    {
      "alias": "appSecondFactors",
      "args": [
        {
          "kind": "Literal",
          "name": "kinds",
          "value": [
            "app"
          ]
        }
      ],
      "concreteType": null,
      "kind": "LinkedField",
      "name": "secondFactors",
      "plural": true,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "internalID",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__typename",
              "storageKey": null
            }
          ],
          "type": "AppSecondFactor"
        }
      ],
      "storageKey": "secondFactors(kinds:[\"app\"])"
    }
  ],
  "type": "Me"
};
(node as any).hash = 'b6550b6f2813f6823386af6ae35690d0';
export default node;
