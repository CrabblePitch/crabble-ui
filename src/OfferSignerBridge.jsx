import React from 'react';
import { BridgeProtocol } from '@agoric/web-components';
import { makeReactDappWalletBridge } from '@agoric/web-components/react';
import { localBridgeHref } from "../config.js";

// Create a wrapper for dapp-wallet-bridge that is specific to
// the app's instance of React.
const DappWalletBridge = makeReactDappWalletBridge(React);

const WalletBridge = ({ address, chainId }) => {
  if (!address || !chainId) return;

  console.log('Connecting Agoric Wallet', {
    address,
    chainId,
  });

  let addOffer, requestDappConnection, isDappApproved;

  const showWarningToast = () => {
    console.log('Warning!');
  };

  const showConnectionSuccessfulToast = () => {
    console.log('Successfully Connected!');
  };

  const onBridgeReady = (ev) => {
    ({
      detail: { isDappApproved, requestDappConnection, addOffer },
    } = ev)

    console.log('On Bridge Ready!', {
      isDappApproved,
      requestDappConnection,
      addOffer,
      ev
    });

    if (isDappApproved) {
      showConnectionSuccessfulToast();
      addOffer({
        test: 'zaaaaa',
      })
    } else {
      requestDappConnection('Crabble');
      showWarningToast();
    }
  };

  const onError = (ev) => {
    console.log('Error!!!!', ev.detail.e.message);
  };

  const onBridgeMessage = (ev) => {
    const { data } = ev.detail;
    switch (data.type) {
      case BridgeProtocol.dappApprovalChanged:
        console.log({ isDappApproved: data.isDappApproved })
        if (data.isDappApproved) {
          addOffer({
            test: 'zaaaaa',
          })
          showConnectionSuccessfulToast();
        } else {
          showWarningToast();
        }
        break;
      default:
        console.warn('Unhandled bridge message', data);
    }
  };

  return (
    <div style={{ "display":"none" }} >
      <DappWalletBridge
          bridgeHref={localBridgeHref}
          onBridgeMessage={onBridgeMessage}
          onBridgeReady={onBridgeReady}
          onError={onError}
          address={address}
          chainId={chainId}
      />
    </div>
  );
};

export default WalletBridge;
