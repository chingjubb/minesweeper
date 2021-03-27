import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import { User } from "./light_reducer";
import { userBirthdayString } from "./ceremony_light_table";

type Props = {
  onClose: () => void;
  open: boolean;
  allUsers: User[];
  selectedNames: string[];
  onSubmit: (selectedNames: string[]) => void;
};

export const SelectUserModal = (props: Props) => {
  const { onClose, open, allUsers, selectedNames, onSubmit } = props;
  const [selectedNameState, setSelectedNameState] = useState<string[]>(
    selectedNames
  );
  console.log("selectedNames", selectedNames);

  const addSelectedName = (name: string) => {
    if (!selectedNameState.includes(name)) {
      const newSelectedNameState = [...selectedNameState];
      newSelectedNameState.push(name);
      setSelectedNameState(newSelectedNameState);
    }
  };

  const removeSelectedName = (name: string) => {
    const newSelectedNameState = selectedNameState.filter(n => n !== name);
    setSelectedNameState(newSelectedNameState);
  };

  const onClick = () => {
    onSubmit(selectedNameState);
    onClose();
  };

  const onCancel = () => {
    setSelectedNameState(selectedNames);
    onClose();
  };

  return (
    <Dialog
      onClose={onCancel}
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth="md"
      fullWidth={false}
    >
      <div style={{ maxHeight: 600, margin: 30, marginTop: 10 }}>
        <DialogTitle>選取點燈人</DialogTitle>
        <TableContainer
          component={Paper}
          style={{ width: 800, marginBottom: 20 }}
        >
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#D8AA56" }}>
                <TableCell />
                <TableCell>姓名</TableCell>
                <TableCell>生日</TableCell>
                <TableCell>地址</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers.map((user: User) => {
                const identifier = user.id ? user.id.toString() : user.name;
                let checked = selectedNameState.includes(identifier);
                return (
                  <TableRow
                    key={
                      identifier + checked.toString() + user.address + user.name
                    }
                  >
                    <TableCell style={{ width: 50 }}>
                      <Checkbox
                        checked={checked}
                        onChange={() => {
                          if (checked) {
                            removeSelectedName(identifier);
                          } else {
                            addSelectedName(identifier);
                          }
                        }}
                        color="default"
                      />
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{userBirthdayString(user)}</TableCell>
                    <TableCell>{user.address}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          color="primary"
          onClick={onClick}
          style={{ width: 150, marginRight: 20, marginBottom: 20 }}
        >
          確定
        </Button>
        <Button
          variant="contained"
          onClick={onCancel}
          style={{ width: 150, marginBottom: 20 }}
        >
          取消
        </Button>
      </div>
    </Dialog>
  );
};
