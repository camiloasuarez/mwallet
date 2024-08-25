// Transfer.jsx
import React from 'react';
import { Input, Button, Spin, Tooltip } from 'antd';

const Transfer = ({
  balance,
  CHAINS_CONFIG,
  selectedChain,
  sendToAddress,
  setSendToAddress,
  amountToSend,
  setAmountToSend,
  sendTransaction,
  processing,
  hash
}) => {
  return (
    <>
      <h3>Native Balance</h3>
      <h1>
        {balance.toFixed(3)} {CHAINS_CONFIG[selectedChain].ticker}
      </h1>
      <div className="sendRow">
        <p style={{ width: "90px", textAlign: "left" }}>To:</p>
        <Input
          value={sendToAddress}
          onChange={(e) => setSendToAddress(e.target.value)}
          placeholder="0x..."
        />
      </div>
      <div className="sendRow">
        <p style={{ width: "90px", textAlign: "left" }}>Amount:</p>
        <Input
          value={amountToSend}
          onChange={(e) => setAmountToSend(e.target.value)}
          placeholder="Native tokens you wish to send..."
        />
      </div>
      <Button
        style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}
        type="primary"
        onClick={() => sendTransaction(sendToAddress, amountToSend)}
      >
        Send Tokens
      </Button>
      {processing && (
        <>
          <Spin />
          {hash && (
            <Tooltip title={hash}>
              <p>Hover For Tx Hash</p>
            </Tooltip>
          )}
        </>
      )}
    </>
  );
};

export default Transfer;
