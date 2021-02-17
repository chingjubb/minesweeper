import React, { useState, Dispatch } from "react";
import { GoToLightPageButton,
		 GoToHomePage } from './add_user_button';
import { Ceremony, Location } from './light_reducer';
import Select from '@material-ui/core/Select';
import { ActionTypes, LightAction, Light } from './light_reducer';

type Props = {
	allLocations: Location[];
	allCeremonies: Ceremony[];
	dispatch: Dispatch<LightAction>;
};

export const SelectLocationPage = (props: Props) => {
	const { allLocations, allCeremonies, dispatch } = props;
	const [selectedLocation, setSelectedLocation] =
		useState<Location>(allLocations.length > 0 ? allLocations[0] : undefined);
	const [selectedCeremony, setSelectedCeremony] =
		useState<Ceremony>(allCeremonies.length > 0 ? allCeremonies[0]: undefined);

	const onLocationChange = (event) => {
		const value = event.target.value;
		const location: Location = allLocations.find((location: Location) => location.id.toString() === value.toString());
		if (location) {
			setSelectedLocation(location);
		}
	};

	const onCeremonyChange = (event) => {
		const value = event.target.value;
		const ceremony: Ceremony = allCeremonies.find((ceremony: Ceremony) => ceremony.id.toString() === value.toString());
		if (ceremony) {
			setSelectedCeremony(ceremony);
		}
	};

	const loadAllLightsForCeremony = (ceremonyId: string) => {
		fetch('https://maitreya-tw.com/api/get_celemony_items/' + ceremonyId)
			.then(res => res.json())
			.then(json => {
				console.log('fetch loadAllLightsFromApi!!! got json', json);
				const allLights: Light[] = json as Light[];
				if (dispatch) {
					dispatch({type: ActionTypes.loadAllLights, allLights});
				}
			});
	}

	return (
		<div style={{ margin: 'auto', width: 400, marginTop: 100}}>
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
			<div style={{marginBottom: 20}}>法會場次:
				<div style={{display: 'inline-block', marginLeft: 10}}>
					<Select
						native
						value={selectedCeremony?.id}
						onChange={onCeremonyChange}
						inputProps={{
							name: 'ceremonyId',
						}}>
						{allCeremonies.map((ceremony: Ceremony) => {
							return <option value={ceremony.id}
										   key={ceremony.id}>{ceremony.name}</option>
						})}
					</Select>
				</div>
			</div>
			<GoToLightPageButton
				disabled={!selectedCeremony || !selectedLocation}
				onClick={()=>{
					dispatch({type: ActionTypes.setLocation, location: selectedLocation});
					dispatch({type: ActionTypes.setCeremony, ceremony: selectedCeremony});
					loadAllLightsForCeremony(selectedCeremony.id);
				}}
			/>
			<GoToHomePage />
		</div>
	);
};
