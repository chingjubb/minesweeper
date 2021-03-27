import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { User } from "./light_reducer";
import { AddUserButton, ColorButton } from "./add_user_button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

type Props = {
  onClose: () => void;
  open: boolean;
  onSubmit: (users: User[]) => void;
};

type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
};

const LoadUserButton = (props: ButtonProps) => {
  const { onClick } = props;
  return (
    <Button
      variant="contained"
      onClick={onClick}
      style={{ marginRight: 20, width: 150 }}
    >
      載入點燈人紀錄
    </Button>
  );
};

export const AddAndSelectUserModal = (props: Props) => {
  const { onClose, open, onSubmit } = props;
  const emptyUser: User = {
    name: "",
    birth_cal: 1,
    birth_year: 0,
    birth_month: 0,
    birth_day: 0,
    address: "",
    comment: ""
  };
  const [users, setUsers] = useState<User[]>([emptyUser]);

  const addEmptyUser = () => {
    const newUsers: User[] = [...users];
    newUsers.push(emptyUser);
    setUsers(newUsers);
  };

  const updateUserAtIndex = (user: User, index: number) => {
    const newUsers: User[] = [...users];
    newUsers[index] = user;
    setUsers(newUsers);
  };

  const deleteUserAtIndex = (index: number) => {
    const newUsers: User[] = [...users];
    newUsers.splice(index, 1);
    setUsers(newUsers);
  };

  const isValid = (): boolean => {
    if (users.length === 0) {
      return false;
    }
    const hasEmptyName = !!users.find(
      (user: User) => user.name.trim().length === 0
    );
    return !hasEmptyName;
  };

  return (
    <Dialog onClose={() => {}} open={open} maxWidth="lg" fullWidth={false}>
      <div
        style={{
          width: 1000,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 30
        }}
      >
        <DialogTitle>設定點燈人</DialogTitle>
        <div style={{ marginBottom: 20 }}>
          <AddUserButton onClick={addEmptyUser} />
          <LoadUserButton onClick={() => {}} />
        </div>
        <TableContainer component={Paper} style={{ width: 960 }}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#D8AA56" }}>
                <TableCell>勾選</TableCell>
                <TableCell>點燈人</TableCell>
                <TableCell>出生民國年</TableCell>
                <TableCell>生月</TableCell>
                <TableCell>生日</TableCell>
                <TableCell>地址</TableCell>
                <TableCell>備註</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user: User, index: number) => {
                return (
                  <Row
                    user={user}
                    key={user.id + user.name + index}
                    onDelete={() => {
                      deleteUserAtIndex(index);
                    }}
                    updateUserAtIndex={(u: User) => {
                      updateUserAtIndex(u, index);
                    }}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ margin: 5, marginTop: 20 }}>
          <ColorButton
            variant="contained"
            color="primary"
            disabled={!isValid()}
            style={{ width: 150, marginRight: 20 }}
            onClick={() => {
              onSubmit(users);
              onClose();
            }}
          >
            編輯完成，送出
          </ColorButton>
          <Button variant="contained" onClick={onClose} style={{ width: 150 }}>
            取消
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

type RowProps = {
  user: User;
  onDelete: () => void;
  updateUserAtIndex: (user: User) => void;
};

export const Row = (props: RowProps) => {
  const { user, updateUserAtIndex, onDelete } = props;

  return (
    <TableRow>
      <TableCell>
        <Button
          variant="contained"
          onClick={onDelete}
          style={{ width: "60px" }}
        >
          刪除
        </Button>
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          style={{ width: 120 }}
          variant="outlined"
          autoFocus
          value={user.name}
          placeholder="點燈人"
          onChange={e => {
            const updatedUser: User = { ...user };
            updatedUser.name = e.target.value;
            updateUserAtIndex(updatedUser);
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          style={{ width: 120 }}
          variant="outlined"
          value={user.birth_year === 0 ? "" : user.birth_year}
          placeholder="空白或0為吉"
          onChange={e => {
            const updatedUser: User = { ...user };
            updatedUser.birth_year = e.target.value;
            updateUserAtIndex(updatedUser);
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          style={{ width: 50 }}
          variant="outlined"
          value={user.birth_month === 0 ? "" : user.birth_month}
          placeholder="吉"
          onChange={e => {
            const updatedUser: User = { ...user };
            updatedUser.birth_month = e.target.value;
            updateUserAtIndex(updatedUser);
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          style={{ width: 50 }}
          variant="outlined"
          value={user.birth_day === 0 ? "" : user.birth_day}
          placeholder="吉"
          onChange={e => {
            const updatedUser: User = { ...user };
            updatedUser.birth_day = e.target.value;
            updateUserAtIndex(updatedUser);
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          style={{ width: 200 }}
          placeholder={"空白為吉"}
          variant="outlined"
          value={user.address}
          onChange={e => {
            const updatedUser: User = { ...user };
            updatedUser.address = e.target.value;
            updateUserAtIndex(updatedUser);
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          style={{ width: 130 }}
          variant="outlined"
          value={user.comment}
          onChange={e => {
            const updatedUser: User = { ...user };
            updatedUser.comment = e.target.value;
            updateUserAtIndex(updatedUser);
          }}
        />
      </TableCell>
    </TableRow>
  );
};
