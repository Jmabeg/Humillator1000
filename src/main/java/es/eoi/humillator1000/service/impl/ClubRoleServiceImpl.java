package es.eoi.humillator1000.service.impl;

import es.eoi.humillator1000.domain.ClubRole;
import es.eoi.humillator1000.repository.ClubRoleRepository;
import es.eoi.humillator1000.service.ClubRoleService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ClubRole}.
 */
@Service
@Transactional
public class ClubRoleServiceImpl implements ClubRoleService {

    private final Logger log = LoggerFactory.getLogger(ClubRoleServiceImpl.class);

    private final ClubRoleRepository clubRoleRepository;

    public ClubRoleServiceImpl(ClubRoleRepository clubRoleRepository) {
        this.clubRoleRepository = clubRoleRepository;
    }

    @Override
    public ClubRole save(ClubRole clubRole) {
        log.debug("Request to save ClubRole : {}", clubRole);
        return clubRoleRepository.save(clubRole);
    }

    @Override
    public ClubRole update(ClubRole clubRole) {
        log.debug("Request to save ClubRole : {}", clubRole);
        return clubRoleRepository.save(clubRole);
    }

    @Override
    public Optional<ClubRole> partialUpdate(ClubRole clubRole) {
        log.debug("Request to partially update ClubRole : {}", clubRole);

        return clubRoleRepository
            .findById(clubRole.getId())
            .map(existingClubRole -> {
                if (clubRole.getName() != null) {
                    existingClubRole.setName(clubRole.getName());
                }

                return existingClubRole;
            })
            .map(clubRoleRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ClubRole> findAll(Pageable pageable) {
        log.debug("Request to get all ClubRoles");
        return clubRoleRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ClubRole> findOne(Long id) {
        log.debug("Request to get ClubRole : {}", id);
        return clubRoleRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ClubRole : {}", id);
        clubRoleRepository.deleteById(id);
    }
}
