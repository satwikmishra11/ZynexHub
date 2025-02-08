// UserActivityService.java
@RestController
@RequestMapping("/api/activity")
public class UserActivityService {
    @PostMapping("/process")
    public ResponseEntity<?> processActivity(@RequestBody Map<String, Object> activityData) {
        // Process activity data here
        return ResponseEntity.ok("Activity processed successfully");
    }
}
