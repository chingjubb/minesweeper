import React from "react";
import { Button } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

type Props = {
	onClick?: () => void;
	disabled?: boolean;
	buttonLabel?: string;
}

export const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: '#77448d', // purple[500],
    '&:hover': {
      backgroundColor: '#693c7d', // purple[700],
    },
  },
}))(Button);

export const AddUserButton = (props: Props) => {
	const { onClick } = props; 
	return (
		<Button variant="contained"
				color="primary"
				onClick={onClick}
				style={{marginRight:'20px', width:'150px'}}
			>新增點燈人</Button>
	);
};

export const LoadUserButton = (props: Props) => {
	const { onClick } = props; 
	return (
		<Button variant="contained"
				color="primary"
				onClick={onClick}
				style={{marginRight:'20px', width:'150px'}}
			>載入點燈人紀錄</Button>
	);
};

export const SelectUserButton = (props: Props) => {
	const { onClick } = props; 
	return (
		<Button variant="contained"
				color="primary"
				onClick={onClick}
				style={{marginRight:'20px', width:'150px'}}
			>選擇點燈人</Button>
	);
};

export const SelectCeremonyButton = (props: Props) => {
	const { onClick } = props; 
	return (
		<Button variant="contained"
				color="primary"
				onClick={onClick}
				style={{marginRight:'20px', width:'150px'}}
			>法會點燈</Button>
	);
};

export const SelectGeneralLightButton = (props: Props) => {
	const { onClick } = props; 
	return (
		<Button variant="contained"
				color="primary"
				onClick={onClick}
				style={{marginRight:'20px', width:'150px'}}
			>一般點燈</Button>
	);
};

export const SelectAnnualLightButton = (props: Props) => {
	const { onClick } = props; 
	return (
		<Button variant="contained"
				color="primary"
				onClick={onClick}
				style={{marginRight:'20px', width:'150px'}}
			>年度點燈</Button>
	);
};

export const GoToLightPageButton = (props: Props) => {
	const { onClick, disabled } = props; 
	return (
		<ColorButton variant="contained"
				color="primary"
				disabled={disabled}
				onClick={onClick}
				style={{marginRight: 20, width: 300}}
			>前往點燈</ColorButton>
	);
};

export const GoToHomePage = (props: Props) => {
	const { onClick } = props;
	return (
		<Button variant="contained"
				color="default"
				onClick={onClick}
				style={{marginRight:'20px', width:'150px'}}
			>回首頁</Button>
	);
};

export const SubmitLightButton = (props: Props) => {
	const { onClick, disabled } = props; 
	return (
		<ColorButton variant="contained"
				color="primary"
				disabled={disabled}
				onClick={onClick}
				style={{marginRight:'20px', width:'150px'}}
			>確認送出本燈單</ColorButton>
	);
};

export const SubmitLightToCounterButton = (props: Props) => {
	const { onClick, disabled } = props; 
	return (
		<ColorButton variant="contained"
				color="primary"
				disabled={disabled}
				onClick={onClick}
				style={{marginRight:'20px', width:'150px'}}
			>櫃檯結帳</ColorButton>
	);
};

export const SubmitLightPayOnlineButton = (props: Props) => {
	const { onClick, disabled } = props; 
	return (
		<ColorButton variant="contained"
				color="primary"
				disabled={disabled}
				onClick={onClick}
				style={{marginRight:'20px', width:'150px'}}
			>線上刷卡</ColorButton>
	);
};

export const GoBackToSelectPage = (props: Props) => {
	const { onClick } = props;
	return (
		<Button variant="contained"
				color="default"
				onClick={onClick}
				style={{marginRight:'20px', width:'150px'}}
			>回選單頁</Button>
	);
};

// 年度燈
export const AddYearLightButton = (props: Props) => {
	const { onClick } = props; 
	return (
		<Button variant="contained"
				color="primary"
				onClick={onClick}
				style={{marginRight:'20px', width:'150px'}}
			>新增加年度燈</Button>
	);
};

export const EditUserButton = (props: Props) => {
	const { onClick } = props; 
	return (
		<Button variant="contained"
				color="primary"
				onClick={onClick}
				style={{marginRight:'20px', width:'150px'}}
			>編輯點燈人</Button>
	);
};

export const NextStepButton = (props: Props) => {
	const { onClick, disabled, buttonLabel } = props; 
	return (
		<ColorButton variant="contained"
				color="primary"
				disabled={disabled}
				onClick={onClick}
				style={{margin: 5, marginRight: 20, width: 300, marginTop: 10}}>
			{buttonLabel ?? '下一步'}
		</ColorButton>
	);
};

export const FinishButton = (props: Props) => {
	const { onClick } = props;
	return (
		<ColorButton variant="contained"
				color="default"
				onClick={onClick}
				style={{marginRight:'20px', width:'180px'}}
			>結束</ColorButton>
	);
};
