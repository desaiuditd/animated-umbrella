/**
 * Created by udit on 25/05/16.
 */
Schemas.userSettings = new SimpleSchema(
	{
		resultsPerPage: {
			type: Number,
			label: "Number of Search Results per page",
			defaultValue: 10,
			max: 100,
			min: 0
		}
	}
);
