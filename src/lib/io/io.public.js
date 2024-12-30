export function filename_without_extension(filename) {
    try {
      return filename.split('.').slice(0, -1).join('.');
      
    } catch (error) {
      console.error(error)
    }
  }


  