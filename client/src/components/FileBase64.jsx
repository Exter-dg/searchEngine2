/*! Copyright (c) 2016 Naufal Rabbani (http://github.com/BosNaufal)
 * Licensed Under MIT (http://opensource.org/licenses/MIT)
 *
 * React File Base64 - Version@1.0.0
 *
 */

import React from "react";

export default function FileBase64(props) {
	const handleChange = (e) => {
		// get the files
		let files = e.target.files;

		// Process each file
		var allFiles = [];
		for (var i = 0; i < files.length; i++) {
			let file = files[i];

			// Make new FileReader
			let reader = new FileReader();

			// Convert the file to base64 text
			reader.readAsDataURL(file);

			// on reader load somthing...
			reader.onload = () => {
				// Make a fileInfo Object
				let fileInfo = {
					name: file.name,
					type: file.type,
					size: Math.round(file.size / 1000) + " kB",
					base64: reader.result,
					file: file,
				};

				// Push it to the state
				allFiles.push(fileInfo);

				// If all files have been proceed
				if (allFiles.length === files.length) {
					// Apply Callback function
					if (props.multiple) props.onDone(allFiles);
					else props.onDone([allFiles[0]]);
				}
			}; // reader.onload
		} // for
	};

	return (
		<input
			type="file"
			onChange={handleChange}
			multiple={props.multiple}
			{...props.attributes}
		/>
	);
}
