import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";

export type Member = {
  id: string;
  name: string;
};

type Props = {
  members: Member[];
  onClick: (memberId: string) => void;
  onClose: () => void;
  open: boolean;
};

export const FindMemberModal = (props: Props) => {
  const { onClick, onClose, members, open } = props;
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth="md"
      fullWidth={false}
    >
      <DialogTitle>選擇使用者</DialogTitle>
      <div style={{ maxHeight: 600, margin: 20 }}>
        <TableContainer component={Paper} style={{ width: 600 }}>
          <Table aria-label="simple table">
            <TableBody>
              {members.map((member: Member) => {
                return (
                  <TableRow key={member.name}>
                    <TableCell style={{ textAlign: "center" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          onClick(member.id);
                        }}
                        style={{ width: 200 }}
                      >
                        {member.name}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell style={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    onClick={onClose}
                    style={{ width: 200 }}
                  >
                    取消
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Dialog>
  );
};
