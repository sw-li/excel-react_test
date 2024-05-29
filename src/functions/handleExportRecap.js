/* global Excel*/

const handleExportRecap = async (setNotification) => {
  try {
    await Excel.run(async (context) => {
      const workbook = context.workbook;
      const worksheets = workbook.worksheets.load("items/name");
      await context.sync();

      // Filter sheets with "RECAP" in their names
      const recapSheetNames = [];
      worksheets.items.map((sheet) => {
        if (sheet.name.includes("RECAP")) {
          recapSheetNames.push(sheet.name);
        }
      });
      await context.sync();
      if (recapSheetNames.length > 0) {
        // Create a temporary workbook and add filtered sheets
        const tempWorkbook = Excel.createWorkbook();

        // Set up the insert options.
        const options = {
          sheetNamesToInsert: recapSheetNames, // Insert all the worksheets from the source workbook.
          positionType: Excel.WorksheetPositionType.after, // Insert after the `relativeTo` sheet.
          relativeTo: "Feuil1", // The sheet relative to which the other worksheets will be inserted. Used with `positionType`.
        };

        // Insert the new worksheets.

        tempWorkbook.insertWorksheetsFromBase64(workbook.toString(), options);

        await context.sync();

        setNotification("RECAP sheets exported successfully.", false);
      } else {
        setNotification("No RECAP sheets found.", true);
      }
    });
  } catch (error) {
    setNotification(`Error: ${error.message}`, true);
  }
};

export default handleExportRecap;
