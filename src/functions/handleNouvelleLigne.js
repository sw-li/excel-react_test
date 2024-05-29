/* global Excel*/

const handleNouvelleLigne = async (setNotification) => {
  try {
    await Excel.run(async (context) => {
      const currentWorksheet = context.workbook.worksheets.getActiveWorksheet();
      const tables = currentWorksheet.tables.load("items");
      await context.sync();

      if (tables.items.length > 0) {
        const firstTable = tables.items[0];
        const columns = firstTable.columns.load("items");
        await context.sync();

        // Find the column that starts with "N° d'ordre"
        let orderColumn = null;
        let orderColumnIndex = -1;
        for (let i = 0; i < columns.items.length; i++) {
          if (columns.items[i].name.startsWith("N° d'ordre")) {
            orderColumn = columns.items[i];
            orderColumnIndex = i;
            break;
          }
        }

        if (orderColumn) {
          orderColumn.load("values");
          await context.sync();

          // Get the number of columns in the table
          const columnCount = columns.items.length;

          let orderValues = orderColumn.values.slice(1).flat();
          let currentOrder = Math.max(...orderValues);

          // Create a new row with the orderColumnIndex cell set to the new order value and others set to null
          const newRow = Array(columnCount).fill(null);
          newRow[orderColumnIndex] = currentOrder + 1;

          // Add a new row to the table
          firstTable.rows.add(null, [newRow]);
          await context.sync();

          setNotification("New row added to the first table.", false);
        } else {
          setNotification("No column starting with 'N° d'ordre' found.", true);
        }
      } else {
        setNotification("No tables found on the current sheet.", true);
      }
    });
  } catch (error) {
    setNotification(`Error: ${error.message}`, true);
  }
};

export default handleNouvelleLigne;
