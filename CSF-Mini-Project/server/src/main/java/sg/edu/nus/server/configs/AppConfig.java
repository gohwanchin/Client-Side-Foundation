package sg.edu.nus.server.configs;

import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class AppConfig {
    
    private Logger logger = Logger.getLogger(AppConfig.class.getName());

    @Value("${cors.pathMapping}")
    String path;
    
    @Value("${cors.origins}")
    String origins;

    @Bean
    public WebMvcConfigurer webMvcConfigurer() {
        logger.info("CORS: path=%s origins=%s".formatted(path, origins));
        return new CORSConfiguration(path, origins);
    }
}
