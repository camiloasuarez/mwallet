// Passwords.jsx
import React from 'react';
import { Select, Button, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const Passwords = ({
  isAddingPassword,
  vaults,
  selectedVault,
  setSelectedVault,
  handleAddPassword,
  handleSavePassword,
  handleCancelAddPassword,
  newCredential,
  setNewCredential
}) => {
  return (
    <>
      {!isAddingPassword && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Select
            defaultValue="all"
            style={{ width: "100%" }}
            onChange={(value) => setSelectedVault(value)}
          >
            <Option value="all">All Vaults</Option>
            {vaults && vaults.length > 0 ? (
              vaults.map((vault) => (
                <Option key={vault.name} value={vault.name}>
                  {vault.name}
                </Option>
              ))
            ) : (
              <Option disabled>No vaults available</Option>
            )}
          </Select>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            style={{ marginLeft: "10px" }}
            onClick={handleAddPassword}
          />
        </div>
      )}
      {isAddingPassword ? (
        <Form layout="vertical">
          <Form.Item label={<span style={{ color: "#ffffff" }}>Username</span>}>
            <Input
              value={newCredential.username}
              onChange={(e) => setNewCredential({ ...newCredential, username: e.target.value })}
            />
          </Form.Item>
          <Form.Item label={<span style={{ color: "#ffffff" }}>Password</span>}>
            <Input.Password
              value={newCredential.password}
              onChange={(e) => setNewCredential({ ...newCredential, password: e.target.value })}
            />
          </Form.Item>
          <Form.Item label={<span style={{ color: "#ffffff" }}>Url</span>}>
            <Input
              value={newCredential.url}
              onChange={(e) => setNewCredential({ ...newCredential, url: e.target.value })}
            />
          </Form.Item>
          <Button type="primary" onClick={handleSavePassword} style={{ marginRight: "10px" }}>
            Save
          </Button>
          <Button onClick={handleCancelAddPassword}>Cancel</Button>
        </Form>
      ) : (
        vaults ? (
          <>
            {vaults
              .filter((vault) =>
                selectedVault === "all" ? true : vault.name === selectedVault
              )
              .map((vault, i) => (
                <div key={i}>
                  {vault.credentials.length > 0 ? (
                    vault.credentials.map((credential) => (
                      <div key={credential.url}>
                        <p>
                          Username: {credential.username},
                          Password: {credential.password},
                          URL: {credential.url}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No credentials found</p>
                  )}
                </div>
              ))}
          </>
        ) : (
          <span>No vaults found</span>
        )
      )}
    </>
  );
};

export default Passwords;
