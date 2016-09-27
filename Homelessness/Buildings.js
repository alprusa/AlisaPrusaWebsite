function jumpTo(building){
	if(start){
		switch(building){
			case "McDonalds":
				JumpToPos(dinner, dinerX);
				break;
			case "Church":
				JumpToPos(church, churchX);
				break;
			case "Shelter":
				JumpToPos(shelter, shelterX);
				break;
			case "Bank":
				JumpToPos(bank, bankX);
				break;
			case "Hospital":
				JumpToPos(hospital, hospitalX);
				break;
			case "School":
				JumpToPos(school, schoolX);
				break;
			default:
				console.log("reposition player something " + building);
					break;
			}
	}
}
