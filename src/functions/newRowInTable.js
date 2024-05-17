/* global Excel*/

export const handleNouvelleLigne = async (setNotification) => {
  try {
    await Excel.run(async (context) => {
      const currentWorksheet = context.workbook.worksheets.getActiveWorksheet();
      const tables = currentWorksheet.tables.load("items");
      await context.sync();

      if (tables.items.length > 0) {
        const firstTable = tables.items[0];
        const column = firstTable.columns.getItem("N° d'ordre");
        column.load("values");
        await context.sync();

        let orderValues = column.values.slice(1).flat();
        let currentOrder = Math.max(...orderValues);

        // Add a new row to the table
        firstTable.rows.add(null, [[currentOrder + 1, null, null]]);
        await context.sync();

        setNotification("New row added to the first table.");
      } else {
        setNotification("No tables found on the current sheet.");
      }
    });
  } catch (error) {
    setNotification(`Error: ${error.message}`);
  }
};
