import React, { useState, Dispatch } from "react";
import { GoToLightPageButton,
		 GoToHomePage } from './add_user_button';
import { Location } from './light_reducer';
import Select from '@material-ui/core/Select';
import { ActionTypes, LightAction } from './light_reducer';

type Props = {
	allLocations: Location[];
	dispatch: Dispatch<LightAction>;
};

export const SelectYearLightLocationPage = (props: Props) => {
	const { allLocations, dispatch } = props;
	const [selectedLocation, setSelectedLocation] =
		useState<Location>(allLocations.length > 0 ? allLocations[0] : undefined);

	const onLocationChange = (event) => {
		const value = event.target.value;
		const location: Location = allLocations.find((location: Location) => location.id.toString() === value.toString());
		if (location) {
			setSelectedLocation(location);
		}
	};
	const year = new Date().getFullYear();

	return (
		<div style={{ margin: 'auto', width: 400, marginTop: 100}}>
			<div style={{marginBottom: 20}}>選擇年度:
				<div style={{display: 'inline-block', marginLeft: 10}}>
					民國{year - 1911}年 (西元{year}年) 
				</div>
			</div>
			<div style={{marginBottom: 20}}>點燈地點: 
				<div style={{display: 'inline-block', marginLeft: 10}}>
					<Select
						native
						value={selectedLocation?.id}
						onChange={onLocationChange}
						inputProps={{
							name: 'locationId',
						}}>
						{allLocations.map((location: Location) => {
							return <option value={location.id}
										   key={location.id}>{location.name}</option>
						})}
					</Select>
				</div>
			</div>
			<GoToLightPageButton
				disabled={!selectedLocation}
				onClick={()=>{
					dispatch({type: ActionTypes.setLocation, location: selectedLocation});
				}}
			/>
			<GoToHomePage onClick={()=>{ window.location.reload() }}/>
		</div>
	);
};
