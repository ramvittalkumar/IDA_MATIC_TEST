import React, { useState } from "react";
import { customHttpProvider } from "./config";
import { Framework } from "@superfluid-finance/sdk-core";
import { Button, Spinner } from "react-bootstrap";
import "./createIndex.css";

//id is a number randomly generated between 1 and a billion
const id = Math.floor(Math.random() * 1000000000);

//where the Superfluid logic takes place

async function createIndex(indexId) {
  const sf = await Framework.create({
    networkName: "matic",
    provider: customHttpProvider
  });

  const signer = sf.createSigner({
    privateKey:
      "0xd2ebfb1517ee73c4bd3d209530a7e1c25352542843077109ae77a2c0213375f1",
    provider: customHttpProvider
  });

  //const DAIx = "0xe3cb950cb164a31c66e32c320a800d477019dcff";
  const USDCx = "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7";

  try {
    const createIndexOperation = sf.idaV1.createIndex({
      indexId: id,
      superToken: USDCx
      // userData?: string
    });

    console.log("Creating your Index...");

    await createIndexOperation.exec(signer);

    console.log(
      `Congrats - you've just created a new Index!
       Network: Matic
       Super Token: USDCx
       Index ID: ${id}
    `
    );
  } catch (error) {
    console.error(error);
  }
}

export const CreateIndex = () => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  function CreateButton({ isLoading, children, ...props }) {
    return (
      <Button variant="success" className="button" {...props}>
        {isButtonLoading ? <Spinner animation="border" /> : children}
      </Button>
    );
  }

  return (
    <div>
      <h2>Create a New Index</h2>

      <CreateButton
        onClick={() => {
          setIsButtonLoading(true);
          createIndex(id);
          setTimeout(() => {
            setIsButtonLoading(false);
          }, 1000);
        }}
      >
        Click to Create Your Index
      </CreateButton>

      <div className="description">
        <p>
          <b>NOTE: </b> You'll also need the index ID you create for the next
          steps in this tutorial.
        </p>
        <p>
          Click the above button and check the console to see your randomly
          generated inded ID.
        </p>
        <p>
          Go to the CreateIndex.js component and look at the{" "}
          <b>createIndex() </b>
          function to see under the hood.
        </p>
      </div>
    </div>
  );
};
