import moleculer from 'moleculer';
import { Service, Action } from 'moleculer-decorators'

@Service({
    name: "downloader"
})
class DownloaderService extends moleculer.Service {

    @Action({
        rest: {
            method: "GET",
            path: "/hello-from-downloader",
        }
    })
    HeyThereFromXura() {
        return "Hey there from downloadeffwer"
    }

}

export default DownloaderService
