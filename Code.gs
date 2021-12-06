// deploy the html service app
const doGet = () =>  HtmlService.createHtmlOutputFromFile('betterindex');

/**
 * we'll use usercache for disambiguation
 * @return {Cache} the cache to use
 */
const getCache = () => CacheService.getScriptCache()

/**
 * write progress to cache
 * @param {string} id a unique id for the cache entry
 * @param {string} value a value to write
 * @return {void} 
 */
const setProgress = (cacheId, value) => getCache().put(cacheId, value);

/**
 * get progress from cach
 * @param {string} id a unique id for the cache entry
 * @return {string} the cache entry
 */
const getProgress = (cacheId) => getCache().get(cacheId);

/**
 * the worker script
 * @param {string} cacheId id a unique id for the cache entry
 */
const main = (cacheId) => {

  setProgress (cacheId, "starting");
  Utilities.sleep(2000);
  
  setProgress(cacheId, "step 2");
  Utilities.sleep(2000);
 
  setProgress(cacheId, "step 3");
  Utilities.sleep(2000);

 
  setProgress(cacheId, "step 4");
  Utilities.sleep(2000);
 
  setProgress(cacheId, "step 5"); 
  Utilities.sleep(2000);
   
  setProgress(cacheId, "done")
}

/**
 * write progress to cache
 * @param {string} id a unique id for the cache entry
 * @param {string | object} value a value to write
 * @return {void} 
 */
const betterSetProgress = (cacheId, value) => getCache().put(cacheId, typeof value === 'object' ? JSON.stringify(value) : value.toString());

/**
 * get progress from cach
 * @param {string} id a unique id for the cache entry
 * @return {string | object } the cache entry
 */
const betterGetProgress = (cacheId) => {
  const value = getCache().get(cacheId);
  try {
    return JSON.parse(value)
  } 
  catch {
    return value
  }
}

/**
 * the worker script
 * @param {string} cacheId id a unique id for the cache entry
 */
const betterMain = (cacheId = "test") => {

  // make a list of false tasks lasting some random amount of time
  const tasks = Array.from({length: 10}).map(f=>Math.ceil(Math.random()* 5000))
  const startedAt = new Date().getTime();
  
  // this time we'll send an object like this
  // {startedAt: timestamp, timeNow: timeStamp, totalTasks: number , taskNumber}
  const progressPack = ({taskNumber = -1, done = false} = {}) => ({
    startedAt,
    timeNow: new Date().getTime(),
    totalTasks: tasks.length,
    taskNumber,
    done
  })
  
  // mark that we're starting
  betterSetProgress (cacheId,progressPack ());
  
  // wait various amounts of time then mark as done
  tasks.forEach ((delay, taskNumber)=> {
    Utilities.sleep(delay);
    betterSetProgress (cacheId,progressPack ({taskNumber}));
    console.log(betterGetProgress(cacheId))
  })
    // mark that we're starting
  betterSetProgress (cacheId,progressPack ({taskNumber: tasks.length , done: true}));
}


